"use client";

import { createContext, useContext, useState } from "react";
import { createFolder, deleteFolder, updateFolderName } from "@/app/actions/folder";
import type { Folder } from "@/lib/mock-data";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  removeFolder: (id: string) => Promise<void>;
  renameFolder: (id: string, name: string) => Promise<void>;
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

  const removeFolder = async (id: string) => {
    await deleteFolder(id);
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  const renameFolder = async (id: string, newName: string) => {
    const name = await updateFolderName(id, newName);
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
