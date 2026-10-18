import AuthLayout from "@/components/auth/AuthLayout";
import AuthSwitchLink from "@/components/auth/AuthSwitchLink";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
      <AuthSwitchLink message="이미 계정이 있으신가요?" href="/login" label="로그인" />
    </AuthLayout>
  );
}
