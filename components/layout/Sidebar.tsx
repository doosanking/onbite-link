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
    <aside className="hidden w-60 shrink-0 flex-col gap-6 border-r border-[var(--border)] p-4 md:flex">
      <AllButton count={totalCount} />
      <FolderList folders={folders} />
    </aside>
  );
}
