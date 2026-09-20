"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLinks } from "@/components/link/LinkProvider";

export default function AllButton() {
  const { links } = useLinks();
  const active = usePathname() === "/";

  return (
    <Link
      href="/"
      aria-current={active ? "page" : undefined}
      className="nav-item flex w-full items-center justify-between rounded-[12px] px-3.5 py-2.5 text-[15px] font-bold text-[var(--text)]"
    >
      <span>📚 전체</span>
      <span className="text-[13px] font-bold text-[var(--text-sub)]">{links.length}</span>
    </Link>
  );
}
