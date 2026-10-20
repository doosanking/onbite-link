"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "@/app/actions/auth";
import AuthForm from "@/components/auth/AuthForm";
import AuthInput from "@/components/auth/AuthInput";
import AuthNotice from "@/components/auth/AuthNotice";
import { useAuthSubmit } from "@/components/auth/useAuthSubmit";

export default function ForgotPasswordForm({ linkExpired = false }: { linkExpired?: boolean }) {
  const [email, setEmail] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);
  const { pending, submit } = useAuthSubmit("메일 발송에 실패했습니다. 다시 시도해주세요.", () => setSentTo(email.trim()));

  const idleLabel = sentTo ? "재설정 링크 다시 보내기" : "비밀번호 재설정 링크 보내기";

  return (
    <AuthForm
      submitLabel={pending ? "보내는 중..." : idleLabel}
      disabled={email.trim() === "" || pending}
      onSubmit={() => submit(() => sendPasswordResetEmail(email))}
    >
      {sentTo ? (
        <AuthNotice>
          {sentTo}(으)로 비밀번호 재설정 링크를 보냈습니다. 메일함을 확인해주세요.
        </AuthNotice>
      ) : linkExpired ? (
        <AuthNotice tone="error">재설정 링크가 만료되었거나 올바르지 않습니다. 다시 요청해주세요.</AuthNotice>
      ) : (
        <AuthNotice>가입한 이메일을 입력하면 비밀번호 재설정 링크를 보내드립니다.</AuthNotice>
      )}
      <AuthInput label="이메일" name="email" type="email" placeholder="example@email.com" autoComplete="email" value={email} onChange={setEmail} />
    </AuthForm>
  );
}
