"use client";

import { createContext, useContext, useState } from "react";
import { links as initialLinks, type LinkItem } from "@/lib/mock-data";

type LinkContextValue = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id" | "createdAt">) => void;
  removeLink: (id: string) => void;
};

const LinkContext = createContext<LinkContextValue | null>(null);

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  const addLink = (link: Omit<LinkItem, "id" | "createdAt">) => {
    setLinks((prev) => [
      { ...link, id: crypto.randomUUID(), createdAt: new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);
  };

  const removeLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  return <LinkContext value={{ links, addLink, removeLink }}>{children}</LinkContext>;
}

export function useLinks() {
  const ctx = useContext(LinkContext);
  if (!ctx) throw new Error("useLinks는 LinkProvider 안에서만 사용할 수 있습니다.");
  return ctx;
}
