import { createBrowserClient } from '@supabase/ssr'

/*
  Wrapper for creating a Supabase browser client.

  Notes:
  - During static prerendering or when environment variables are not present
    we return a noop stub client to avoid throwing during build.
  - The noop client implements the small subset of methods the app uses
    (auth.signInWithPassword, auth.getUser, auth.signOut, and from().select()).
  - When running in a browser and the env vars are configured, we return
    the real Supabase browser client created by `createBrowserClient`.
*/

function createNoopClient() {
  const noop = {
    auth: {
      // Attempts to sign in will return an error indicating Supabase is not configured
      signInWithPassword: async () => ({ error: new Error('Supabase not configured') }),
      // getUser returns an object with null user so consuming code can handle unauthenticated state
      getUser: async () => ({ data: { user: null } }),
      // signOut resolves successfully (no-op)
      signOut: async () => ({ error: null }),
    },
    // Minimal `from()` stub returning an object with `select` for queries in mocks
    from: () => ({ select: async () => ({ data: [], error: null }) }),
  }

  return noop as any
}

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If environment is not configured, return noop to avoid runtime errors during build/prerender
  if (!url || !key) {
    return createNoopClient()
  }

  // Only create the real browser client when running in a browser
  if (typeof window === 'undefined') {
    return createNoopClient()
  }

  return createBrowserClient(url, key)
}
