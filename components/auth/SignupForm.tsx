"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/app/actions/auth";
import AuthForm from "@/components/auth/AuthForm";
import AuthInput from "@/components/auth/AuthInput";
import { useToast } from "@/components/ui/Toast";

export default function SignupForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [pending, setPending] = useState(false);
  // state 갱신 전 연속 클릭까지 막기 위해 ref로 즉시 잠근다.
  const submittingRef = useRef(false);

  const filled = email.trim() !== "" && password !== "" && passwordConfirm !== "";

  return (
    <AuthForm
      submitLabel={pending ? "가입하는 중..." : "회원가입"}
      disabled={!filled || pending}
      onSubmit={async () => {
        if (submittingRef.current) return;
        if (password !== passwordConfirm) {
          showToast("비밀번호가 일치하지 않습니다.");
          return;
        }

        submittingRef.current = true;
        setPending(true);
        let error: string | undefined;
        try {
          ({ error } = await signUp(email, password));
        } catch {
          error = "회원가입에 실패했습니다. 다시 시도해주세요.";
        }

        if (error) {
          showToast(error);
          submittingRef.current = false;
          setPending(false);
          return;
        }
        router.push("/");
      }}
    >
      <AuthInput label="이메일" name="email" type="email" placeholder="example@email.com" autoComplete="email" value={email} onChange={setEmail} />
      <AuthInput label="비밀번호" name="password" type="password" placeholder="비밀번호를 입력하세요" autoComplete="new-password" value={password} onChange={setPassword} />
      <AuthInput label="비밀번호 확인" name="passwordConfirm" type="password" placeholder="비밀번호를 다시 입력하세요" autoComplete="new-password" value={passwordConfirm} onChange={setPasswordConfirm} />
    </AuthForm>
  );
}
