"use client";

import { useState } from "react";
import NewFolderModal from "@/components/folder/NewFolderModal";

export default function NewFolderButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="nav-item rounded-[12px] px-4 py-2 text-sm font-bold text-[var(--accent-text)]"
      >
        + 새 폴더
      </button>
      <NewFolderModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
