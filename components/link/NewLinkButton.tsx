import Link from "next/link";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
    >
      + 새 링크
    </Link>
  );
}
