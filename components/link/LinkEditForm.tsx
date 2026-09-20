"use client";

import { useState } from "react";
import FolderSelect from "@/components/folder/FolderSelect";
import { useFolders } from "@/components/folder/FolderProvider";
import type { LinkItem } from "@/lib/mock-data";

export type LinkEditValues = Pick<LinkItem, "folderId" | "title" | "description">;

const fieldClass =
  "field rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-3.5 py-3 text-base font-normal text-[var(--text)]";

export default function LinkEditForm({
  link,
  onSubmit,
  onClose,
}: {
  link: LinkItem;
  onSubmit: (values: LinkEditValues) => void;
  onClose: () => void;
}) {
  const { folders } = useFolders();
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const trimmed = title.trim();
        if (!trimmed) return;
        const folderId = String(new FormData(e.currentTarget).get("folderId"));
        onSubmit({ folderId, title: trimmed, description: description.trim() });
        onClose();
      }}
    >
      <FolderSelect folders={folders} defaultValue={link.folderId} />
      <label className="flex flex-col gap-2 text-sm font-bold text-[var(--text)]">
        제목
        <input
          type="text"
          autoFocus
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-bold text-[var(--text)]">
        설명
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명을 입력하세요"
          className={`${fieldClass} resize-none`}
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
          disabled={!title.trim()}
          className="btn-primary rounded-[12px] bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
        >
          저장
        </button>
      </div>
    </form>
  );
}
