import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Proxy에서 쓰는 클라이언트. 만료된 세션이 갱신되면 새 쿠키를 요청과 응답 양쪽에 반영한다.
export function createSupabaseProxyClient(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        // 세션 쿠키가 담긴 응답이 다른 사용자에게 캐시되지 않도록 한다.
        Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });

  // setAll이 response를 교체하므로 호출 시점의 응답을 꺼내 쓰도록 함수로 넘긴다.
  return { supabase, getResponse: () => response };
}
