import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseProxyClient } from "@/lib/supabase-proxy";

// 로그인한 사용자만 인덱스, 폴더별, 새 링크 페이지에 접근할 수 있다.
// 비밀번호 재설정 페이지는 재설정 링크로 받은 세션이 있어야 쓸 수 있다.
export async function proxy(request: NextRequest) {
  const { supabase, getResponse } = createSupabaseProxyClient(request);

  // getClaims는 JWT 서명을 검증하므로 쿠키 위조로 통과할 수 없다.
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return getResponse();
}

export const config = {
  matcher: ["/", "/folder/:path*", "/new", "/reset-password"],
};
