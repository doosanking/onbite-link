import AllButton from "@/components/folder/AllButton";
import FolderList from "@/components/folder/FolderList";
import type { Folder } from "@/lib/mock-data";

export default function Sidebar({
  folders,
  totalCount,
}: {
  folders: Folder[];
  totalCount: number;
}) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-4 border-r border-zinc-200 p-4 dark:border-zinc-800 md:flex">
      <AllButton count={totalCount} />
      <FolderList folders={folders} />
    </aside>
  );
}
