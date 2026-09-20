import AllButton from "@/components/folder/AllButton";
import FolderList from "@/components/folder/FolderList";

export default function Sidebar({ totalCount }: { totalCount: number }) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-7 p-5 md:flex">
      <AllButton count={totalCount} />
      <FolderList />
    </aside>
  );
}
