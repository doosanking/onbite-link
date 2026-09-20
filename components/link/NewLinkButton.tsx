import Link from "next/link";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="btn-primary rounded-[12px] bg-[var(--accent)] px-5 py-2 text-sm font-bold text-white"
    >
      + 새 링크
    </Link>
  );
}
