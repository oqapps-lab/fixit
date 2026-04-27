import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '@/lib/supabase/client';

WebBrowser.maybeCompleteAuthSession();

function toErrorMessage(error, fallbackMessage) {
  if (error instanceof Error && error.message.length > 0) {
    return error.message;
  }
  return fallbackMessage;
}

function getOAuthRedirectTo() {
  return Linking.createURL('/sign-in');
}

export async function signInWithEmail({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error !== null) {
    throw new Error(toErrorMessage(error, 'Email sign-in failed.'));
  }

  return data;
}

export async function signUpWithEmail({ email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error !== null) {
    throw new Error(toErrorMessage(error, 'Email sign-up failed.'));
  }

  return data;
}

export async function signInWithOAuth(provider) {
  const redirectTo = getOAuthRedirectTo();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error !== null) {
    throw new Error(toErrorMessage(error, 'OAuth sign-in failed.'));
  }

  if (typeof data?.url !== 'string' || data.url.length === 0) {
    throw new Error('OAuth sign-in URL was not returned by Supabase.');
  }

  const authResult = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (authResult.type !== 'success') {
    return {
      completed: false,
      type: authResult.type,
    };
  }

  const parsed = Linking.parse(authResult.url);
  const code = typeof parsed.queryParams?.code === 'string' ? parsed.queryParams.code : null;

  if (code === null || code.length === 0) {
    throw new Error('OAuth callback is missing authorization code.');
  }

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
  if (exchangeError !== null) {
    throw new Error(toErrorMessage(exchangeError, 'Failed to exchange OAuth code for session.'));
  }

  return {
    completed: true,
    type: 'success',
  };
}

export async function signOutAuth() {
  const { error } = await supabase.auth.signOut();
  if (error !== null) {
    throw new Error(toErrorMessage(error, 'Sign-out failed.'));
  }
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error !== null) {
    return null;
  }
  return data.user;
}

export async function getCurrentUserId() {
  const user = await getCurrentUser();
  return user?.id ?? null;
}

export function subscribeToAuthState(callback) {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
  return data.subscription;
}
