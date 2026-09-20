import Link from "next/link";
import NewFolderButton from "@/components/folder/NewFolderButton";
import NewLinkButton from "@/components/link/NewLinkButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between bg-[var(--card)] px-5 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <Link href="/" className="text-xl font-bold text-[var(--accent-text)]">
        🔖 한입 링크
      </Link>
      <div className="flex items-center gap-2">
        <NewFolderButton />
        <NewLinkButton />
      </div>
    </header>
  );
}
