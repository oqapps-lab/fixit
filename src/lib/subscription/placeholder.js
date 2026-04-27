import AsyncStorage from '@react-native-async-storage/async-storage';

const FREE_QUOTA_LIMIT = 3;
const ESTIMATE_COUNT_KEY = 'fixit.subscription.estimate_count';

function parseCount(rawValue) {
  if (rawValue === null) {
    return 0;
  }

  const parsed = Number.parseInt(rawValue, 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
}

export async function getEstimateCount() {
  const raw = await AsyncStorage.getItem(ESTIMATE_COUNT_KEY);
  return parseCount(raw);
}

export async function incrementEstimateCount() {
  const current = await getEstimateCount();
  const next = current + 1;
  await AsyncStorage.setItem(ESTIMATE_COUNT_KEY, String(next));
  return next;
}

export async function getSubscriptionPlaceholderState() {
  const count = await getEstimateCount();
  return {
    plan: 'free',
    freeLimit: FREE_QUOTA_LIMIT,
    estimatesUsed: count,
    remainingFree: Math.max(0, FREE_QUOTA_LIMIT - count),
    requiresSubscription: count >= FREE_QUOTA_LIMIT,
  };
}
