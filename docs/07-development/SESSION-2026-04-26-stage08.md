# FixIt Stage 08 — AI Photo Diagnosis (2026-04-26)

**Mode:** автономный, ~1.5h на стэк.
**Финал:** real photo → gpt-5.4 vision → structured estimate → live в UI.

---

## TL;DR

FixIt теперь действительно работает: пользователь даёт фото поломки → через **Supabase Edge Function** оно уходит в **OpenAI gpt-5.4** с строгим JSON-schema → возвращается structured estimate (title / category / severity / room / DIY/Hybrid/Pro price ladder / diagnosis) → INSERT в DB → пользователь видит готовый estimate в `/estimates/[id]`.

Стоимость ~$0.004 за анализ (1089 input + 131 output tokens на photo с gpt-5.4).

End-to-end LIVE подтверждён скриншотом — AI сгенерировал "Rusting outdoor condenser stand / HVAC / MODERATE / DIY $180 · Hybrid $420 · Pro $950 · Save $770" из реального фото HVAC condenser unit, render'ится в `/estimates` list (7 estimates, savings $1,954) + `/estimates/[id]` детально.

---

## Архитектура

```
Capture screen (RN)
    ↓ pickFromGallery + ImagePicker
    ↓ uploadPhoto via supabase.storage to private bucket
    ↓ photo row INSERT (RLS-scoped)
    ↓ router.push('/(onboarding)/processing') -- existing animated screen
    ↓ analyzePhoto(photo_id) → supabase.functions.invoke
        ↓
        Edge Function (Deno):
          - verify JWT (auth.getUser via anon client)
          - load photo row + verify ownership manually
          - createSignedUrl on private bucket (10 min TTL)
          - POST to OpenAI /v1/chat/completions:
              model: gpt-5.4
              messages: [system rules, user image_url=signedUrl]
              response_format: json_schema strict
              schema: title/category/severity/room/diy/hybrid/pro/diagnosis
          - parse + clamp prices
          - compute savings_vs_pro
          - INSERT estimates (service-role bypasses RLS, ownership pre-checked)
          - mark photos.ai_analyzed=true
          - return { ok, estimate_id }
        ↓
    ↓ router.replace('/estimates/[estimate_id]')  on success
    ↓ router.replace('/error/ai-failed')          on failure
```

---

## Что закоммичено

**Сервер:**
- `supabase/functions/analyze-photo/index.ts` — 250+ строк Deno TypeScript
- `supabase/config.toml` — supabase init
- Function deployed: `https://koeshloejuevvdnaxkqd.supabase.co/functions/v1/analyze-photo`
- Secret set: `OPENAI_API_KEY` (через Management API через CLI)

**Клиент:**
- `services/ai.ts` — `analyzePhoto(photoId)` через `supabase.functions.invoke`, `AiAnalysisError` class для типизированных ошибок
- `app/(onboarding)/capture.tsx` — wired full flow: upload → push processing → analyze → push estimate detail (replace на error/* при failure)
- `tsconfig.json` — exclude `supabase/functions/**` из Node TS check (Deno runtime separate)

---

## Edge Function детали

### Безопасность
- ✅ JWT validation через `auth.getUser(jwt)`
- ✅ Ownership check: photo.user_id === auth.uid()
- ✅ Service role используется только для signed URL + INSERT, после владения проверки
- ✅ OPENAI_API_KEY в Supabase Function Secrets (не доступен клиенту)
- ✅ CORS headers для прямого invoke с RN

### Error handling
| HTTP | Code | Cause |
|---|---|---|
| 401 | `missing_auth` / `invalid_jwt` | No or bad JWT |
| 400 | `missing_photo_id` | Bad request body |
| 404 | `photo_not_found` | UUID не существует |
| 403 | `forbidden` | photo.user_id ≠ auth.uid() |
| 500 | `signed_url_failed` | Storage error |
| 502 | `openai_failed` / `openai_empty_response` / `openai_invalid_json` | AI failure |
| 500 | `insert_failed` | DB error |
| 200 | `ok: true` + `estimate_id` + `usage` | Success |

### AI prompt
Detailed system message с правилами для FixIt:
- title: 4-8 words, plain English
- category enum: 7 options
- severity enum: low/moderate/high
- room enum: 8 options
- diy_price = parts only
- hybrid_price = parts + 1-2h handyman labor
- pro_price = full service-call
- Denver Colorado retail prices, 2026 rates ($95/hr handyman, $150/hr licensed)
- "no repairable issue" → all prices=0, severity=low, explanatory diagnosis

Strict JSON schema гарантирует валидную структуру (нет fallback парсинга).

---

## Smoke test (real photo, real AI, real DB)

**Setup:**
- Demo user JWT obtained via password grant
- Real broken-thing photo: Pexels HVAC condenser image 600x898, 92KB
- Uploaded to `photos/{user_id}/test_*.jpg` via Storage REST
- Photo row inserted: `63da540a-d1e8-4aed-ac60-65610a269f0d`

**Invoke:**
```bash
POST /functions/v1/analyze-photo
Authorization: Bearer <user_jwt>
Body: {"photo_id":"63da540a-d1e8-4aed-ac60-65610a269f0d"}
```

**Result:**
```json
{
  "ok": true,
  "estimate_id": "215a737b-1b6b-4423-b652-221898f95641",
  "usage": {
    "prompt_tokens": 1089,
    "completion_tokens": 131,
    "total_tokens": 1220
  }
}
```

**DB row verified via psql:**
| field | value |
|---|---|
| code | EST-2026-0426-P4 |
| title | Rusting outdoor condenser stand |
| room | exterior |
| category | hvac |
| severity | moderate |
| diy_price | 180.00 |
| hybrid_price | 420.00 |
| pro_price | 950.00 |
| savings_vs_pro | 770.00 |
| diagnosis | "The photo shows two outdoor HVAC condensing units mounted on a visibly rusted steel support frame. The units themselves appear intact, but the corroding stand should be cleaned, treated, and repainted, or partially replaced if metal loss is significant, to keep the equipment safely supported. Fixing it would typically involve rust removal, primer/paint, and possibly welding or replacing sections of the frame." |

**Live UI verification:**
- `/estimates/215a737b-...` рендерится с AI-сгенерированным title (3-line wrap), diagnosis (6-line wrap), blueprint card showing ROOM·EXTERIOR / CAT·HVAC, IMPACT $950, MODERATE severity, 3-route ladder
- `/estimates` list показывает "7 estimates · total saved vs blind-pro: $1,954" (was 6 / $1,184) — top row "EST-2026-0426-P4 / Rusting outdoor condenser stand / $950 EST / MODERATE / Apr 26 PENDING"

---

## Стоимость

**Per-photo analysis:**
- gpt-5.4-2026-03-05
- Input: ~1089 tokens (system prompt + image @ low detail)
- Output: ~131 tokens (compact JSON)
- Cost estimate: ~$0.004 per analysis (на основе $2.50/M input, $10/M output для GPT-5)

**Optimization opportunities (Stage 09+):**
- Prompt caching на system message: −50% input cost (~$0.001 saved)
- Image resize before signed URL: меньше токенов на vision = дешевле
- Cache popular categories' base prices в DB

---

## Что НЕ сделано (явные scope-cuts)

1. **Live tap-test capture button через mobile-mcp** — aigirlfriends app preinstalled на Claude QA sim перехватывает foreground когда mobile-mcp активен. Per global rules не трогаю чужой WDA. End-to-end проверен через REST + visual deep-link verify.
2. **Camera capture** — `expo-camera` всё ещё не подключён (нужен EAS dev client). GALLERY upload работает.
3. **Real-time progress** — `processing.tsx` показывает фейк-stages (хардкод). Можно подключить subscribe channel на photos table или WebSocket для real progress, но текущий UX достаточен.
4. **Re-analyze flow** — нет UI для "AI gave bad result, try again". User должен capture новое фото.
5. **Photo preview before analyze** — нет confirm-screen после upload, сразу analyze. Можно добавить "this is the photo we'll analyze, OK?".

---

## Окружение

- **Supabase Edge Function:** `analyze-photo` deployed на koeshloejuevvdnaxkqd
- **Secrets:** `OPENAI_API_KEY` set via CLI
- **Supabase CLI:** установлен через `npx supabase` (brew не сработал — issue с CLT)
- **PAT:** `sbp_15ef233e6f7c140b544f0d5f72cc65e3d5eb06f7` сохранён в `.env.local` (gitignored)
- **OpenAI key:** в `.env.local` (gitignored) + Supabase secrets
- **Sim Claude QA:** booted, FixIt active, 1 AI estimate seeded в DB (Rusting condenser)
- **Чужие 7 sim'ов:** не тронуты ни одним кликом

---

## Следующие шаги

1. **EAS Build dev client** для real `expo-camera` (вместо GALLERY-only)
2. **Adapty integration** — paywall наконец заблокирует > 3 free estimates per user (нужен Stage 08 завершённый ai-flow для real "value moment")
3. **Prompt caching** — снизить cost на системный prompt
4. **Progress webhook** — заменить фейк-stages в processing на real progress
5. **Re-analyze button** — на estimate detail если user не доволен AI выводом
6. **Re-imagine processing.tsx** — connect к real AI-stage updates через Supabase Realtime
7. **iOS push** для push-уведомлений (новый estimate готов)
