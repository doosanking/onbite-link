"use client";

import { useEffect, useRef } from "react";

export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto w-[calc(100%-40px)] max-w-sm rounded-[16px] bg-[var(--card)] p-6 text-[var(--text)] shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop:bg-black/40"
    >
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      {open && children}
    </dialog>
  );
}
