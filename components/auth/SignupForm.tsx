"use client";

import { useState } from "react";
import { signUp } from "@/app/actions/auth";
import AuthForm from "@/components/auth/AuthForm";
import AuthInput from "@/components/auth/AuthInput";
import { useAuthSubmit } from "@/components/auth/useAuthSubmit";

export default function SignupForm() {
  const { pending, submit, showToast } = useAuthSubmit("회원가입에 실패했습니다. 다시 시도해주세요.");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const filled = email.trim() !== "" && password !== "" && passwordConfirm !== "";

  return (
    <AuthForm
      submitLabel={pending ? "가입하는 중..." : "회원가입"}
      disabled={!filled || pending}
      onSubmit={() => {
        if (password !== passwordConfirm) {
          showToast("비밀번호가 일치하지 않습니다.");
          return;
        }
        submit(() => signUp(email, password));
      }}
    >
      <AuthInput label="이메일" name="email" type="email" placeholder="example@email.com" autoComplete="email" value={email} onChange={setEmail} />
      <AuthInput label="비밀번호" name="password" type="password" placeholder="비밀번호를 입력하세요" autoComplete="new-password" value={password} onChange={setPassword} />
      <AuthInput label="비밀번호 확인" name="passwordConfirm" type="password" placeholder="비밀번호를 다시 입력하세요" autoComplete="new-password" value={passwordConfirm} onChange={setPasswordConfirm} />
    </AuthForm>
  );
}
