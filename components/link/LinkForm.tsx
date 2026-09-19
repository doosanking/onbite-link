"use client";

import FolderSelect from "@/components/folder/FolderSelect";
import type { Folder } from "@/lib/mock-data";

export default function LinkForm({ folders }: { folders: Folder[] }) {
  return (
    <form
      className="flex flex-col gap-5 rounded-[8px] border border-[var(--border)] bg-[var(--card)] p-6"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: 저장 로직 연결
      }}
    >
      <label className="flex flex-col gap-2 text-sm font-medium text-[var(--text)]">
        링크
        <input
          type="url"
          name="url"
          required
          placeholder="https://example.com"
          className="field rounded-[6px] border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base font-normal text-[var(--text)]"
        />
      </label>
      <FolderSelect folders={folders} />
      <button
        type="submit"
        className="btn-primary rounded-[6px] bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white"
      >
        저장
      </button>
    </form>
  );
}
