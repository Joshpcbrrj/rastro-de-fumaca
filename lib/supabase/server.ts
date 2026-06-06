import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/*
  Server-side Supabase client wrapper.

  This function returns a real server client when Supabase env vars are configured.
  During build/prerender (or when env vars are missing), it returns a noop stub
  to prevent the build from crashing while still allowing pages to render.

  The stub implements the minimal API surface used by the app (auth.getUser, from().select()).
*/

function createNoopServerClient() {
  const noop = {
    auth: {
      getUser: async () => ({ data: { user: null } }),
    },
    from: () => ({ select: async () => ({ data: [], error: null }) }),
  }

  return noop as any
}

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If env vars are absent, return a noop server client to avoid prerender errors
  if (!url || !key) {
    return createNoopServerClient()
  }

  const cookieStore = cookies()

  return createServerClient(
    url,
    key,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}
