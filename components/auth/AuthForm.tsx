"use client";

export default function AuthForm({
  submitLabel,
  children,
}: {
  submitLabel: string;
  children: React.ReactNode;
}) {
  return (
    <form
      className="flex flex-col gap-[14px] rounded-[16px] bg-[var(--card)] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.06)]"
      onSubmit={(e) => {
        // 인증 기능은 아직 구현하지 않으므로 기본 제출(페이지 이동)만 막는다.
        e.preventDefault();
      }}
    >
      {children}
      <button
        type="submit"
        className="btn-primary mt-2 rounded-[12px] bg-[var(--accent)] px-6 py-3.5 text-base font-bold text-white"
      >
        {submitLabel}
      </button>
    </form>
  );
}
