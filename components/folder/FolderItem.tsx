"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Folder } from "@/lib/mock-data";

export default function FolderItem({ folder }: { folder: Folder }) {
  const href = `/folder/${folder.id}`;
  const active = usePathname() === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="nav-item flex w-full items-center justify-between rounded-[12px] px-3.5 py-2.5 text-[15px] text-[var(--text)]"
    >
      <span className="truncate">📁 {folder.name}</span>
      <span className="text-[13px] text-[var(--text-sub)]">{folder.count}</span>
    </Link>
  );
}
