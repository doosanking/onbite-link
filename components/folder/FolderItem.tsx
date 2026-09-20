"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DeleteFolderModal from "@/components/folder/DeleteFolderModal";
import EditFolderModal from "@/components/folder/EditFolderModal";
import { useFolders } from "@/components/folder/FolderProvider";
import { useLinks } from "@/components/link/LinkProvider";
import type { Folder } from "@/lib/mock-data";

export default function FolderItem({ folder }: { folder: Folder }) {
  const href = `/folder/${folder.id}`;
  const active = usePathname() === href;
  const router = useRouter();
  const { removeFolder } = useFolders();
  const { links } = useLinks();
  const count = links.filter((l) => l.folderId === folder.id).length;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="group relative">
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className="nav-item flex w-full items-center justify-between rounded-[12px] px-3.5 group-hover:pr-[76px] group-focus-within:pr-[76px] py-2.5 text-[15px] text-[var(--text)]"
      >
        <span className="truncate">📁 {folder.name}</span>
        <span className="text-[13px] text-[var(--text-sub)] group-hover:invisible group-focus-within:invisible">
          {count}
        </span>
      </Link>
      <button
        type="button"
        aria-label={`${folder.name} 폴더 이름 수정`}
        onClick={() => setEditOpen(true)}
        className="icon-btn absolute top-1/2 right-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-[8px] text-[var(--text-sub)] opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
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
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      </button>
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
      <EditFolderModal
        folder={folder}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
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
