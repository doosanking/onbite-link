import AuthLayout from "@/components/auth/AuthLayout";
import AuthSwitchLink from "@/components/auth/AuthSwitchLink";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default async function ForgotPasswordPage({ searchParams }: PageProps<"/forgot-password">) {
  const { error } = await searchParams;

  return (
    <AuthLayout>
      <ForgotPasswordForm linkExpired={error === "expired"} />
      <AuthSwitchLink message="비밀번호가 기억나셨나요?" href="/login" label="로그인" />
    </AuthLayout>
  );
}
