"use client";

import { useState } from "react";
import { signIn } from "@/app/actions/auth";
import AuthForm from "@/components/auth/AuthForm";
import AuthInput from "@/components/auth/AuthInput";
import { useAuthSubmit } from "@/components/auth/useAuthSubmit";

export default function LoginForm() {
  const { pending, submit } = useAuthSubmit("로그인에 실패했습니다. 다시 시도해주세요.");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const filled = email.trim() !== "" && password !== "";

  return (
    <AuthForm
      submitLabel={pending ? "로그인하는 중..." : "로그인"}
      disabled={!filled || pending}
      onSubmit={() => submit(() => signIn(email, password))}
    >
      <AuthInput label="이메일" name="email" type="email" placeholder="example@email.com" autoComplete="email" value={email} onChange={setEmail} />
      <AuthInput label="비밀번호" name="password" type="password" placeholder="비밀번호를 입력하세요" autoComplete="current-password" value={password} onChange={setPassword} />
    </AuthForm>
  );
}
