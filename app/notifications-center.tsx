import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { NoirScreen } from '@/components/ui/NoirScreen';
import { NoirHeader } from '@/components/ui/NoirHeader';
import { NoirCard } from '@/components/ui/NoirCard';
import { DocRef } from '@/components/ui/DocRef';
import { Label } from '@/components/ui/Label';
import { AmberCTA } from '@/components/ui/AmberCTA';
import { colors, fonts, spacing, tracking, typeScale } from '@/constants/tokens';

type Tone = 'amber' | 'cyan' | 'mint' | 'danger';
type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  tone: Tone;
  route?: string;
  read: boolean;
};

const INITIAL: Notification[] = [
  {
    id: 'n-01',
    title: 'Roof leak — step 2 ready',
    body: 'Pick up sealant + trowel today. Step-by-step guide queued.',
    time: '12 min ago',
    tone: 'amber',
    route: '/repair-step?id=rp-002&n=2',
    read: false,
  },
  {
    id: 'n-02',
    title: 'Spring is coming',
    body: 'Three small fixes worth knowing about before summer. Gutters first.',
    time: '2 hours ago',
    tone: 'cyan',
    route: '/seasonal',
    read: false,
  },
  {
    id: 'n-03',
    title: 'Grout prices dropped 18%',
    body: 'Mapei Ultracolor Plus FA at Home Depot — was $38, now $31. Stock up before weekend.',
    time: 'Yesterday',
    tone: 'mint',
    route: '/estimates/est-003',
    read: false,
  },
  {
    id: 'n-04',
    title: '$185 saved — share it?',
    body: 'Remember the kitchen faucet you DIY’d a month ago? You saved $185 vs. calling a pro blind.',
    time: '3 days ago',
    tone: 'amber',
    route: '/invite',
    read: true,
  },
  {
    id: 'n-05',
    title: 'Warranty check-in',
    body: 'Dishwasher warranty expires in 62 days. Consider the extended plan before it lapses.',
    time: '5 days ago',
    tone: 'cyan',
    route: '/warranty',
    read: true,
  },
  {
    id: 'n-06',
    title: 'Smoke detector batteries overdue',
    body: 'Six days past due. Cheap enough to handle today.',
    time: '1 week ago',
    tone: 'danger',
    route: '/home/maintenance',
    read: true,
  },
];

export default function NotificationsCenter() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<Notification[]>(INITIAL);

  const unread = items.filter((n) => !n.read).length;

  const markAll = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
    setItems([]);
  };

  const open = (n: Notification) => {
    Haptics.selectionAsync().catch(() => {});
    setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
    if (n.route) router.push(n.route as any);
  };

  const dismiss = (id: string) => {
    Haptics.selectionAsync().catch(() => {});
    setItems((prev) => prev.filter((n) => n.id !== id));
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
              {items.length === 0
                ? 'Nothing new. Quiet hours respected.'
                : `${unread} unread · ${items.length} total`}
            </Text>
          </View>
          {items.length > 0 ? (
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

        {items.length === 0 ? (
          <NoirCard variant="outlined" radius="md" padding={22} style={{ marginTop: spacing.xxl }}>
            <DocRef tone="cyan">EMPTY</DocRef>
            <Text allowFontScaling={false} style={styles.emptyTitle}>You’re all caught up</Text>
            <Text allowFontScaling={false} style={styles.emptyMeta}>
              New alerts land when something changes in your house, a price drops, or a project step is ready.
            </Text>
          </NoirCard>
        ) : (
          <View style={{ marginTop: spacing.xl, gap: spacing.sm }}>
            {items.map((n) => (
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
                    variant={n.read ? 'outlined' : 'elevated'}
                    radius="md"
                    padding={16}
                    style={[
                      styles.row,
                      !n.read ? styles.rowUnread : null,
                      pressed ? { opacity: 0.7 } : null,
                    ]}
                  >
                    <View style={[styles.tick, toneBg(n.tone)]} />
                    <View style={{ flex: 1 }}>
                      <View style={styles.titleRow}>
                        <Text
                          allowFontScaling={false}
                          style={[styles.itemTitle, !n.read ? { color: colors.text } : null]}
                          numberOfLines={2}
                        >
                          {n.title}
                        </Text>
                        {!n.read ? <View style={styles.dot} /> : null}
                      </View>
                      <Text allowFontScaling={false} style={styles.itemBody} numberOfLines={3}>
                        {n.body}
                      </Text>
                      <DocRef tone={n.tone}>{n.time.toUpperCase()}</DocRef>
                    </View>
                  </NoirCard>
                )}
              </Pressable>
            ))}

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
