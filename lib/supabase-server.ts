import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// 로그인 세션을 쿠키에 저장하는 클라이언트. 요청마다 새로 만들어야 하며 공유하면 안 된다.
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Component 렌더링 중에는 쿠키를 쓸 수 없다. Server Action에서는 정상 동작한다.
        }
      },
    },
  });
}
