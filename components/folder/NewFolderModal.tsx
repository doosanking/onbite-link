"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useFolders } from "@/components/folder/FolderProvider";

export default function NewFolderModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} title="새 폴더">
      <NewFolderForm onClose={onClose} />
    </Modal>
  );
}

function NewFolderForm({ onClose }: { onClose: () => void }) {
  const { addFolder } = useFolders();
  const [name, setName] = useState("");

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;
        addFolder(trimmed);
        onClose();
      }}
    >
      <label className="flex flex-col gap-2 text-sm font-bold text-[var(--text)]">
        폴더 이름
        <input
          type="text"
          autoFocus
          required
          maxLength={20}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="폴더 이름을 입력하세요"
          className="field rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-3.5 py-3 text-base font-normal text-[var(--text)]"
        />
      </label>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="nav-item rounded-[12px] px-5 py-2.5 text-sm font-bold text-[var(--text-sub)]"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={!name.trim()}
          className="btn-primary rounded-[12px] bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
        >
          저장
        </button>
      </div>
    </form>
  );
}
