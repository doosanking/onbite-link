import type { Folder } from "@/lib/mock-data";

export default function FolderSelect({ folders }: { folders: Folder[] }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-bold text-[var(--text)]">
      폴더
      <select
        name="folderId"
        defaultValue=""
        required
        className="field rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-3.5 py-3 text-base font-normal text-[var(--text)]"
      >
        <option value="" disabled>
          폴더를 선택하세요
        </option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
    </label>
  );
}
