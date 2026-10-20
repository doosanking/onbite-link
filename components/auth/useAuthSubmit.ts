"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

type AuthAction = () => Promise<{ error?: string }>;

// 인증 요청을 보내고, 실패하면 토스트를 띄우고 성공하면 onSuccess를 실행한다(없으면 인덱스 페이지로 이동).
export function useAuthSubmit(fallbackError: string, onSuccess?: () => void) {
  const router = useRouter();
  const { showToast } = useToast();
  const [pending, setPending] = useState(false);
  // state 갱신 전 연속 클릭까지 막기 위해 ref로 즉시 잠근다.
  const submittingRef = useRef(false);

  async function submit(action: AuthAction) {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setPending(true);

    let error: string | undefined;
    try {
      ({ error } = await action());
    } catch {
      error = fallbackError;
    }

    // 페이지를 이동할 때는 이동이 끝날 때까지 잠근 채로 둔다.
    if (error || onSuccess) {
      submittingRef.current = false;
      setPending(false);
    }

    if (error) showToast(error);
    else if (onSuccess) onSuccess();
    else router.push("/");
  }

  return { pending, submit, showToast };
}
