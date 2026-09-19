"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AllButton({ count }: { count: number }) {
  const active = usePathname() === "/";

  return (
    <Link
      href="/"
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
        active
          ? "bg-zinc-100 dark:bg-zinc-800"
          : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
      }`}
    >
      <span>ALL</span>
      <span className="text-xs font-normal text-zinc-500">{count}</span>
    </Link>
  );
}
