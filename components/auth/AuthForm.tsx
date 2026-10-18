"use client";

type AuthFormProps = {
  submitLabel: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  disabled?: boolean;
};

export default function AuthForm({ submitLabel, children, onSubmit, disabled }: AuthFormProps) {
  return (
    <form
      className="flex flex-col gap-[14px] rounded-[16px] bg-[var(--card)] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.06)]"
      onSubmit={(e) => {
        // 기본 제출은 입력값을 URL에 노출하므로 항상 막고 onSubmit으로 처리한다.
        e.preventDefault();
        if (!disabled) onSubmit?.();
      }}
    >
      {children}
      <button
        type="submit"
        disabled={disabled}
        className="btn-primary mt-2 rounded-[12px] bg-[var(--accent)] px-6 py-3.5 text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitLabel}
      </button>
    </form>
  );
}
