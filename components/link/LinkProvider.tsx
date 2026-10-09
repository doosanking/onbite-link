"use client";

import { createContext, useContext, useState } from "react";
import { createLink, updateLink as updateLinkAction } from "@/app/actions/link";
import type { LinkItem } from "@/lib/mock-data";

type LinkContextValue = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id" | "createdAt">) => Promise<void>;
  removeLink: (id: string) => void;
  updateLink: (id: string, values: Pick<LinkItem, "folderId" | "title" | "description">) => Promise<void>;
};

const LinkContext = createContext<LinkContextValue | null>(null);

export function LinkProvider({
  initialLinks,
  children,
}: {
  initialLinks: LinkItem[];
  children: React.ReactNode;
}) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  const addLink = async (link: Omit<LinkItem, "id" | "createdAt">) => {
    const created = await createLink(link);
    setLinks((prev) => [created, ...prev]);
  };

  const removeLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const updateLink = async (
    id: string,
    values: Pick<LinkItem, "folderId" | "title" | "description">,
  ) => {
    const updated = await updateLinkAction(id, values);
    setLinks((prev) => prev.map((link) => (link.id === id ? updated : link)));
  };

  return <LinkContext value={{ links, addLink, removeLink, updateLink }}>{children}</LinkContext>;
}

export function useLinks() {
  const ctx = useContext(LinkContext);
  if (!ctx) throw new Error("useLinks는 LinkProvider 안에서만 사용할 수 있습니다.");
  return ctx;
}
