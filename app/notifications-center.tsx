import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';
import {
  listNotifications,
  markRead,
  markAllRead,
  deleteNotification,
} from '@/services/notifications';
import type { NotificationRow, NotificationTone } from '@/types/database';

type Tone = 'amber' | 'cyan' | 'mint' | 'danger';

function toneFromBackend(t: NotificationTone): Tone {
  switch (t) {
    case 'success':
      return 'mint';
    case 'warn':
      return 'amber';
    case 'danger':
      return 'danger';
    case 'info':
    default:
      return 'cyan';
  }
}

function relativeTime(iso: string): string {
  const created = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - created);
  const mins = Math.round(diff / (1000 * 60));
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function NotificationsCenter() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<NotificationRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    listNotifications()
      .then((rows) => {
        if (cancelled) return;
        setItems(rows);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e?.message ?? 'Failed to load notifications');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const unread = items.filter((n) => !n.read_at).length;

  const markAll = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    const now = new Date().toISOString();
    setItems((prev) => prev.map((n) => (n.read_at ? n : { ...n, read_at: now })));
    try {
      await markAllRead();
    } catch {
      // best-effort; refetch on failure
      try {
        const rows = await listNotifications();
        setItems(rows);
      } catch {
        /* noop */
      }
    }
  };

  const clearAll = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
    const snapshot = items;
    setItems([]);
    try {
      await Promise.all(snapshot.map((n) => deleteNotification(n.id)));
    } catch {
      // restore on failure
      setItems(snapshot);
    }
  };

  const open = async (n: NotificationRow) => {
    Haptics.selectionAsync().catch(() => {});
    if (!n.read_at) {
      const now = new Date().toISOString();
      setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read_at: now } : x)));
      markRead(n.id).catch(() => {
        setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read_at: null } : x)));
      });
    }
    if (n.meta) router.push(n.meta as any);
  };

  const dismiss = async (id: string) => {
    Haptics.selectionAsync().catch(() => {});
    const snapshot = items;
    setItems((prev) => prev.filter((n) => n.id !== id));
    try {
      await deleteNotification(id);
    } catch {
      setItems(snapshot);
    }
  };

  return (
    <NoirScreen>
      <NoirHeader brand="NOTIFICATIONS · INBOX" showBack showAvatar={false} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + spacing.huge },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.head}>
          <View>
            <DocRef>SIGNAL · QUEUE</DocRef>
            <Text allowFontScaling={false} style={styles.title}>INBOX</Text>
            <Text allowFontScaling={false} style={styles.body}>
              {loading
                ? 'Loading…'
                : items.length === 0
                ? 'Nothing new. Quiet hours respected.'
                : `${unread} unread · ${items.length} total`}
            </Text>
          </View>
          {!loading && items.length > 0 ? (
            <Pressable
              onPress={markAll}
              accessibilityRole="button"
              accessibilityLabel="Mark all read"
              hitSlop={8}
            >
              <Text allowFontScaling={false} style={styles.markAll}>MARK READ</Text>
            </Pressable>
          ) : null}
        </View>

        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator color={colors.amber} />
          </View>
        ) : error ? (
          <NoirCard variant="outlined" radius="md" padding={22} style={{ marginTop: spacing.xxl }}>
            <DocRef tone="danger">ERROR</DocRef>
            <Text allowFontScaling={false} style={styles.emptyTitle}>Could not load</Text>
            <Text allowFontScaling={false} style={styles.emptyMeta}>{error}</Text>
          </NoirCard>
        ) : items.length === 0 ? (
          <NoirCard variant="outlined" radius="md" padding={22} style={{ marginTop: spacing.xxl }}>
            <DocRef tone="cyan">EMPTY</DocRef>
            <Text allowFontScaling={false} style={styles.emptyTitle}>You’re all caught up</Text>
            <Text allowFontScaling={false} style={styles.emptyMeta}>
              New alerts land when something changes in your house, a price drops, or a project step is ready.
            </Text>
          </NoirCard>
        ) : (
          <View style={{ marginTop: spacing.xl, gap: spacing.sm }}>
            {items.map((n) => {
              const tone = toneFromBackend(n.tone);
              const isRead = !!n.read_at;
              const time = relativeTime(n.created_at);
              return (
                <Pressable
                  key={n.id}
                  onPress={() => open(n)}
                  onLongPress={() => dismiss(n.id)}
                  accessibilityRole="button"
                  accessibilityLabel={n.title}
                  accessibilityHint="Tap to open. Long-press to dismiss."
                  hitSlop={4}
                >
                  {({ pressed }) => (
                    <NoirCard
                      variant={isRead ? 'outlined' : 'elevated'}
                      radius="md"
                      padding={16}
                      style={[
                        styles.row,
                        !isRead ? styles.rowUnread : null,
                        pressed ? { opacity: 0.7 } : null,
                      ]}
                    >
                      <View style={[styles.tick, toneBg(tone)]} />
                      <View style={{ flex: 1 }}>
                        <View style={styles.titleRow}>
                          <Text
                            allowFontScaling={false}
                            style={[styles.itemTitle, !isRead ? { color: colors.text } : null]}
                            numberOfLines={2}
                          >
                            {n.title}
                          </Text>
                          {!isRead ? <View style={styles.dot} /> : null}
                        </View>
                        {n.body ? (
                          <Text allowFontScaling={false} style={styles.itemBody} numberOfLines={3}>
                            {n.body}
                          </Text>
                        ) : null}
                        <DocRef tone={tone}>{time.toUpperCase()}</DocRef>
                      </View>
                    </NoirCard>
                  )}
                </Pressable>
              );
            })}

            <View style={{ height: spacing.xl }} />
            <AmberCTA label="Clear all" variant="dark" size="md" onPress={clearAll} />
          </View>
        )}
      </ScrollView>
    </NoirScreen>
  );
}

function toneBg(tone: Tone) {
  switch (tone) {
    case 'amber':  return { backgroundColor: colors.amber };
    case 'cyan':   return { backgroundColor: colors.cyan };
    case 'mint':   return { backgroundColor: colors.mint };
    case 'danger': return { backgroundColor: colors.danger };
  }
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  loadingWrap: {
    marginTop: spacing.xxxl,
    alignItems: 'center',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    marginTop: spacing.sm,
    fontFamily: fonts.displayNarrowBold,
    fontSize: 42,
    color: colors.text,
    letterSpacing: 1.2,
  },
  body: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.textSecondary,
  },
  markAll: {
    fontFamily: fonts.monoMedium,
    fontSize: typeScale.labelSmall,
    color: colors.amber,
    letterSpacing: tracking.labelWide,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  rowUnread: {
    borderColor: colors.hairlineAmber,
  },
  tick: {
    width: 3,
    height: 24,
    borderRadius: 2,
    marginTop: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.amber,
  },
  itemTitle: {
    flex: 1,
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.textSecondary,
    letterSpacing: tracking.tight,
  },
  itemBody: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  emptyTitle: {
    marginTop: spacing.sm,
    fontFamily: fonts.displaySemibold,
    fontSize: typeScale.titleSmall,
    color: colors.text,
    letterSpacing: tracking.tight,
  },
  emptyMeta: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
