"use client";

import { useRef, useState } from "react";
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
  onSubmit: (values: LinkEditValues) => void | Promise<void>;
  onClose: () => void;
}) {
  const { folders } = useFolders();
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);
  const [pending, setPending] = useState(false);
  // state 갱신 전 연속 클릭까지 막기 위해 ref로 즉시 잠근다.
  const submittingRef = useRef(false);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const trimmed = title.trim();
        if (!trimmed || submittingRef.current) return;
        const folderId = String(new FormData(e.currentTarget).get("folderId"));
        submittingRef.current = true;
        setPending(true);
        try {
          await onSubmit({ folderId, title: trimmed, description: description.trim() });
          onClose();
        } finally {
          submittingRef.current = false;
          setPending(false);
        }
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
          disabled={!title.trim() || pending}
          className="btn-primary rounded-[12px] bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
        >
          {pending ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
}
