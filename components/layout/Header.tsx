import Link from "next/link";
import NewLinkButton from "@/components/link/NewLinkButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg)]/80 px-4 backdrop-blur-[8px]">
      <Link href="/" className="text-base font-semibold text-[var(--text)]">
        🔖 한입 링크
      </Link>
      <NewLinkButton />
    </header>
  );
}
