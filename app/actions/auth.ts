"use server";

import { createClient } from "@supabase/supabase-js";

type AuthResult = { error?: string };

// 공용 supabase 클라이언트에 세션이 저장되면 모든 요청이 그 사용자로 동작하므로
// 인증 요청은 세션을 저장하지 않는 별도 클라이언트로 보낸다.
function createAuthClient() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const SIGNUP_ERROR_MESSAGES: Record<string, string> = {
  user_already_exists: "이미 가입된 이메일입니다.",
  email_exists: "이미 가입된 이메일입니다.",
  email_address_invalid: "올바른 이메일 주소를 입력해주세요.",
  validation_failed: "이메일 또는 비밀번호 형식이 올바르지 않습니다.",
  weak_password: "비밀번호가 너무 약합니다. 6자 이상으로 입력해주세요.",
  signup_disabled: "현재 회원가입이 비활성화되어 있습니다.",
  over_email_send_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
  over_request_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
};

export async function signUp(email: string, password: string): Promise<AuthResult> {
  const trimmedEmail = email.trim();
  if (!trimmedEmail || !password) return { error: "이메일과 비밀번호를 모두 입력해주세요." };

  const { data, error } = await createAuthClient().auth.signUp({
    email: trimmedEmail,
    password,
  });

  if (error) {
    return { error: (error.code && SIGNUP_ERROR_MESSAGES[error.code]) || "회원가입에 실패했습니다. 다시 시도해주세요." };
  }
  // 이메일 인증을 켜둔 경우 이미 가입된 이메일이어도 오류 대신 identities가 빈 사용자가 반환된다.
  if (data.user?.identities?.length === 0) {
    return { error: SIGNUP_ERROR_MESSAGES.user_already_exists };
  }
  return {};
}
