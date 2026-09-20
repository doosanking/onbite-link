"use client";

import Modal from "@/components/ui/Modal";
import type { LinkItem } from "@/lib/mock-data";

export default function DeleteLinkModal({
  link,
  open,
  onClose,
  onConfirm,
}: {
  link: LinkItem;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} title="링크 삭제">
      <p className="mb-5 text-[15px] text-[var(--text)]">
        <strong className="font-bold">🔗 {link.title}</strong> 링크를 정말 삭제할까요?
      </p>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="nav-item rounded-[12px] px-5 py-2.5 text-sm font-bold text-[var(--text-sub)]"
        >
          취소
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="btn-danger rounded-[12px] bg-[var(--error)] px-5 py-2.5 text-sm font-bold text-white"
        >
          삭제
        </button>
      </div>
    </Modal>
  );
}
