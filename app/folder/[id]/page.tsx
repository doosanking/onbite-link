import { notFound } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import LinkGrid from "@/components/link/LinkGrid";
import { getFolders } from "@/lib/folder-data";

export default async function FolderPage({ params }: PageProps<"/folder/[id]">) {
  const { id } = await params;
  const folders = await getFolders();
  const folder = folders.find((f) => f.id === id);
  if (!folder) notFound();

  return (
    <AppShell>
      <h1 className="mb-6 text-[30px] font-bold leading-[1.2] text-[var(--text)]">{folder.name}</h1>
      <LinkGrid folderId={folder.id} />
    </AppShell>
  );
}
