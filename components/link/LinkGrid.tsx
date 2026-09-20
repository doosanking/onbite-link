"use client";

import { useFolders } from "@/components/folder/FolderProvider";
import LinkCard from "@/components/link/LinkCard";
import { useLinks } from "@/components/link/LinkProvider";

export default function LinkGrid({ folderId }: { folderId?: string }) {
  const { folders } = useFolders();
  const { links: allLinks } = useLinks();
  const links = folderId ? allLinks.filter((l) => l.folderId === folderId) : allLinks;

  if (links.length === 0) {
    return (
      <p className="py-20 text-center text-sm text-[var(--text-sub)]">
        등록된 링크가 없습니다.
      </p>
    );
  }

  const folderName = (id: string) => folders.find((f) => f.id === id)?.name;

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} folderName={folderName(link.folderId)} />
        </li>
      ))}
    </ul>
  );
}
