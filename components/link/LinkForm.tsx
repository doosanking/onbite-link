"use client";

import FolderSelect from "@/components/folder/FolderSelect";
import type { Folder } from "@/lib/mock-data";

export default function LinkForm({ folders }: { folders: Folder[] }) {
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: 저장 로직 연결
      }}
    >
      <label className="flex flex-col gap-2 text-sm font-medium">
        링크
        <input
          type="url"
          name="url"
          required
          placeholder="https://example.com"
          className="rounded-lg border border-zinc-300 bg-transparent px-3 py-2 font-normal outline-none focus:border-foreground dark:border-zinc-700"
        />
      </label>
      <FolderSelect folders={folders} />
      <button
        type="submit"
        className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        저장
      </button>
    </form>
  );
}
