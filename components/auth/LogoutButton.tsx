"use client";

import { useTransition } from "react";
import { signOut } from "@/app/actions/auth";
import { useToast } from "@/components/ui/Toast";

export default function LogoutButton() {
  const { showToast } = useToast();
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      // 성공하면 서버 액션이 /login으로 리다이렉트하므로 실패한 경우만 처리한다.
      const result = await signOut();
      if (result?.error) showToast(result.error);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="nav-item mt-auto w-full rounded-[12px] px-3.5 py-2.5 text-left text-[15px] font-bold text-[var(--text-sub)] disabled:opacity-50"
    >
      {pending ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
}
