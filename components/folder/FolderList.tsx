"use client";

import FolderItem from "@/components/folder/FolderItem";
import { useFolders } from "@/components/folder/FolderProvider";

export default function FolderList() {
  const { folders } = useFolders();

  return (
    <nav aria-label="폴더">
      <h2 className="mb-2 px-3 text-xs font-medium text-[var(--text-sub)]">폴더</h2>
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
