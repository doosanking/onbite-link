import Link from "next/link";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="btn-primary rounded-[6px] bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white"
    >
      + 새 링크
    </Link>
  );
}
