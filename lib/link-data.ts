import { connection } from "next/server";
import type { LinkItem } from "@/lib/mock-data";
import { supabase } from "@/lib/supabase";

export type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  create_at: string;
  folder_id: number | null;
};

export const LINK_COLUMNS = "id, url, title, description, thumbnail_url, create_at, folder_id";

export function toLinkItem(row: LinkRow): LinkItem {
  return {
    id: String(row.id),
    url: row.url,
    title: row.title ?? "",
    description: row.description ?? "",
    thumbnail: row.thumbnail_url ?? undefined,
    folderId: row.folder_id === null ? "" : String(row.folder_id),
    createdAt: row.create_at.slice(0, 10),
  };
}

export async function getLinks(): Promise<LinkItem[]> {
  await connection();

  const { data, error } = await supabase
    .from("link")
    .select(LINK_COLUMNS)
    .order("create_at", { ascending: false })
    .order("id", { ascending: false });

  if (error) throw new Error(`링크 목록을 불러오지 못했습니다: ${error.message}`);
  return data.map(toLinkItem);
}
