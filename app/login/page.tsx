import AuthForm from "@/components/auth/AuthForm";
import AuthInput from "@/components/auth/AuthInput";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthSwitchLink from "@/components/auth/AuthSwitchLink";

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthForm submitLabel="로그인">
        <AuthInput label="이메일" name="email" type="email" placeholder="example@email.com" autoComplete="email" />
        <AuthInput label="비밀번호" name="password" type="password" placeholder="비밀번호를 입력하세요" autoComplete="current-password" />
      </AuthForm>
      <AuthSwitchLink message="아직 계정이 없으신가요?" href="/signup" label="회원가입" />
    </AuthLayout>
  );
}
