import AuthLayout from "@/components/auth/AuthLayout";
import AuthSwitchLink from "@/components/auth/AuthSwitchLink";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
      <AuthSwitchLink message="비밀번호를 잊으셨나요?" href="/forgot-password" label="비밀번호 찾기" />
      <AuthSwitchLink message="아직 계정이 없으신가요?" href="/signup" label="회원가입" />
    </AuthLayout>
  );
}
