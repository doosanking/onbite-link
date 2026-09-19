"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AllButton({ count }: { count: number }) {
  const active = usePathname() === "/";

  return (
    <Link
      href="/"
      aria-current={active ? "page" : undefined}
      className="nav-item flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-sm text-[var(--text)]"
    >
      <span>📚 전체</span>
      <span className="text-xs font-normal text-[var(--text-sub)]">{count}</span>
    </Link>
  );
}
