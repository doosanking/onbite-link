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
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-zinc-100 dark:bg-zinc-800"
          : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
      }`}
    >
      <span className="truncate">📁 {folder.name}</span>
      <span className="text-xs text-zinc-500">{folder.count}</span>
    </Link>
  );
}
