"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type ToastContextValue = { showToast: (message: string) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  // id를 함께 저장해 같은 메시지가 연속으로 와도 타이머가 다시 시작되게 한다.
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);

  const showToast = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          key={toast.id}
          role="alert"
          className="fixed top-5 left-1/2 z-50 w-max max-w-[calc(100%-40px)] -translate-x-1/2 rounded-[12px] bg-[var(--error)] px-5 py-3 text-sm font-bold text-white shadow-[var(--shadow-hover)]"
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast는 ToastProvider 안에서 사용해야 합니다.");
  return context;
}
