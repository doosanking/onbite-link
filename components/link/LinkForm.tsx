"use client";

import FolderSelect from "@/components/folder/FolderSelect";
import { useFolders } from "@/components/folder/FolderProvider";

export default function LinkForm() {
  const { folders } = useFolders();

  return (
    <form
      className="flex flex-col gap-[14px] rounded-[16px] bg-[var(--card)] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.06)]"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: 저장 로직 연결
      }}
    >
      <label className="flex flex-col gap-2 text-sm font-bold text-[var(--text)]">
        링크
        <input
          type="url"
          name="url"
          required
          placeholder="https://example.com"
          className="field rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-3.5 py-3 text-base font-normal text-[var(--text)]"
        />
      </label>
      <FolderSelect folders={folders} />
      <button
        type="submit"
        className="btn-primary mt-2 rounded-[12px] bg-[var(--accent)] px-6 py-3.5 text-base font-bold text-white"
      >
        저장
      </button>
    </form>
  );
}
