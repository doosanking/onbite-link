import AuthForm from "@/components/auth/AuthForm";
import AuthInput from "@/components/auth/AuthInput";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthSwitchLink from "@/components/auth/AuthSwitchLink";

export default function SignupPage() {
  return (
    <AuthLayout>
      <AuthForm submitLabel="회원가입">
        <AuthInput label="이메일" name="email" type="email" placeholder="example@email.com" autoComplete="email" />
        <AuthInput label="비밀번호" name="password" type="password" placeholder="비밀번호를 입력하세요" autoComplete="new-password" />
        <AuthInput label="비밀번호 확인" name="passwordConfirm" type="password" placeholder="비밀번호를 다시 입력하세요" autoComplete="new-password" />
      </AuthForm>
      <AuthSwitchLink message="이미 계정이 있으신가요?" href="/login" label="로그인" />
    </AuthLayout>
  );
}
