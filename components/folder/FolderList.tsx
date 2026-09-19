import FolderItem from "@/components/folder/FolderItem";
import type { Folder } from "@/lib/mock-data";

export default function FolderList({ folders }: { folders: Folder[] }) {
  return (
    <nav aria-label="폴더">
      <h2 className="mb-2 px-3 text-xs font-medium text-zinc-500">폴더</h2>
      <ul className="flex flex-col gap-1">
        {folders.map((folder) => (
          <li key={folder.id}>
            <FolderItem folder={folder} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
