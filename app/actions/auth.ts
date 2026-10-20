"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type AuthResult = { error?: string };

const RATE_LIMIT_MESSAGE = "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";

const SIGNUP_ERROR_MESSAGES: Record<string, string> = {
  user_already_exists: "이미 가입된 이메일입니다.",
  email_exists: "이미 가입된 이메일입니다.",
  email_address_invalid: "올바른 이메일 주소를 입력해주세요.",
  validation_failed: "이메일 또는 비밀번호 형식이 올바르지 않습니다.",
  weak_password: "비밀번호가 너무 약합니다. 6자 이상으로 입력해주세요.",
  signup_disabled: "현재 회원가입이 비활성화되어 있습니다.",
  over_email_send_rate_limit: RATE_LIMIT_MESSAGE,
  over_request_rate_limit: RATE_LIMIT_MESSAGE,
};

const SIGNIN_ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "이메일 또는 비밀번호가 올바르지 않습니다.",
  email_not_confirmed: "이메일 인증이 완료되지 않았습니다. 메일함을 확인해주세요.",
  validation_failed: "이메일 또는 비밀번호 형식이 올바르지 않습니다.",
  user_banned: "이용이 제한된 계정입니다.",
  over_request_rate_limit: RATE_LIMIT_MESSAGE,
};

export async function signUp(email: string, password: string): Promise<AuthResult> {
  const trimmedEmail = email.trim();
  if (!trimmedEmail || !password) return { error: "이메일과 비밀번호를 모두 입력해주세요." };

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
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

export async function signIn(email: string, password: string): Promise<AuthResult> {
  const trimmedEmail = email.trim();
  if (!trimmedEmail || !password) return { error: "이메일과 비밀번호를 모두 입력해주세요." };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: trimmedEmail,
    password,
  });

  if (error) {
    return { error: (error.code && SIGNIN_ERROR_MESSAGES[error.code]) || "로그인에 실패했습니다. 다시 시도해주세요." };
  }
  return {};
}

// 세션 쿠키를 지우고 로그인 페이지로 이동한다.
export async function signOut(): Promise<AuthResult> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) return { error: "로그아웃에 실패했습니다. 다시 시도해주세요." };
  redirect("/login");
}
