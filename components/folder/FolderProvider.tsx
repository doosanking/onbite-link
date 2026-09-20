"use client";

import { createContext, useContext, useState } from "react";
import { folders as initialFolders, type Folder } from "@/lib/mock-data";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const addFolder = (name: string) => {
    setFolders((prev) => [...prev, { id: crypto.randomUUID(), name, count: 0 }]);
  };

  return <FolderContext value={{ folders, addFolder }}>{children}</FolderContext>;
}

export function useFolders() {
  const ctx = useContext(FolderContext);
  if (!ctx) throw new Error("useFolders는 FolderProvider 안에서만 사용할 수 있습니다.");
  return ctx;
}
