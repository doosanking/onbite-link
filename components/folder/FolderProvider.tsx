"use client";

import { createContext, useContext, useState } from "react";
import { createFolder } from "@/app/actions/folder";
import type { Folder } from "@/lib/mock-data";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  removeFolder: (id: string) => void;
  renameFolder: (id: string, name: string) => void;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function FolderProvider({
  initialFolders,
  children,
}: {
  initialFolders: Folder[];
  children: React.ReactNode;
}) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const addFolder = async (name: string) => {
    const folder = await createFolder(name);
    setFolders((prev) => [...prev, folder]);
  };

  const removeFolder = (id: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  const renameFolder = (id: string, name: string) => {
    setFolders((prev) =>
      prev.map((folder) => (folder.id === id ? { ...folder, name } : folder)),
    );
  };

  return (
    <FolderContext value={{ folders, addFolder, removeFolder, renameFolder }}>
      {children}
    </FolderContext>
  );
}

export function useFolders() {
  const ctx = useContext(FolderContext);
  if (!ctx) throw new Error("useFolders는 FolderProvider 안에서만 사용할 수 있습니다.");
  return ctx;
}
