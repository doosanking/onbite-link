import LinkCard from "@/components/link/LinkCard";
import type { Folder, LinkItem } from "@/lib/mock-data";

export default function LinkGrid({
  links,
  folders,
}: {
  links: LinkItem[];
  folders: Folder[];
}) {
  if (links.length === 0) {
    return (
      <p className="py-20 text-center text-sm text-zinc-500">
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
