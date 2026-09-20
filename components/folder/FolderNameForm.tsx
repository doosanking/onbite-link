"use client";

import { useState } from "react";

export default function FolderNameForm({
  initialName = "",
  onSubmit,
  onClose,
}: {
  initialName?: string;
  onSubmit: (name: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(initialName);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;
        onSubmit(trimmed);
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
