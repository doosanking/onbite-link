"use client";

import { useState } from "react";
import { updatePassword } from "@/app/actions/auth";
import AuthForm from "@/components/auth/AuthForm";
import AuthInput from "@/components/auth/AuthInput";
import AuthNotice from "@/components/auth/AuthNotice";
import { useAuthSubmit } from "@/components/auth/useAuthSubmit";

export default function ResetPasswordForm() {
  const { pending, submit, showToast } = useAuthSubmit("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const filled = password !== "" && passwordConfirm !== "";

  return (
    <AuthForm
      submitLabel={pending ? "변경하는 중..." : "비밀번호 변경"}
      disabled={!filled || pending}
      onSubmit={() => {
        if (password !== passwordConfirm) {
          showToast("비밀번호가 일치하지 않습니다.");
          return;
        }
        submit(() => updatePassword(password));
      }}
    >
      <AuthNotice>새로 사용할 비밀번호를 입력해주세요.</AuthNotice>
      <AuthInput label="새 비밀번호" name="password" type="password" placeholder="새 비밀번호를 입력하세요" autoComplete="new-password" value={password} onChange={setPassword} />
      <AuthInput label="새 비밀번호 확인" name="passwordConfirm" type="password" placeholder="새 비밀번호를 다시 입력하세요" autoComplete="new-password" value={passwordConfirm} onChange={setPasswordConfirm} />
    </AuthForm>
  );
}
