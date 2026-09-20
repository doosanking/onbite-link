"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DeleteFolderModal from "@/components/folder/DeleteFolderModal";
import { useFolders } from "@/components/folder/FolderProvider";
import type { Folder } from "@/lib/mock-data";

export default function FolderItem({ folder }: { folder: Folder }) {
  const href = `/folder/${folder.id}`;
  const active = usePathname() === href;
  const router = useRouter();
  const { removeFolder } = useFolders();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="group relative">
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className="nav-item flex w-full items-center justify-between rounded-[12px] px-3.5 py-2.5 text-[15px] text-[var(--text)]"
      >
        <span className="truncate">📁 {folder.name}</span>
        <span className="text-[13px] text-[var(--text-sub)] group-hover:invisible group-focus-within:invisible">
          {folder.count}
        </span>
      </Link>
      <button
        type="button"
        aria-label={`${folder.name} 폴더 삭제`}
        onClick={() => setConfirmOpen(true)}
        className="icon-btn absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-[8px] text-[var(--text-sub)] opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6M14 11v6" />
        </svg>
      </button>
      <DeleteFolderModal
        folder={folder}
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          removeFolder(folder.id);
          if (active) router.push("/");
        }}
      />
    </div>
  );
}
