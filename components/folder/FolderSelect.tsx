import type { Folder } from "@/lib/mock-data";

export default function FolderSelect({ folders }: { folders: Folder[] }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium">
      폴더
      <select
        name="folderId"
        defaultValue=""
        required
        className="rounded-lg border border-zinc-300 bg-background px-3 py-2 font-normal outline-none focus:border-foreground dark:border-zinc-700"
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
