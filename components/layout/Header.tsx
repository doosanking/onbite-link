import Link from "next/link";
import NewLinkButton from "@/components/link/NewLinkButton";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 px-6 dark:border-zinc-800">
      <Link href="/" className="text-xl font-bold tracking-tight">
        한입 링크
      </Link>
      <NewLinkButton />
    </header>
  );
}
