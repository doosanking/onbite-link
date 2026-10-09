"use server";

import { LINK_COLUMNS, toLinkItem } from "@/lib/link-data";
import type { LinkItem } from "@/lib/mock-data";
import { supabase } from "@/lib/supabase";

export async function createLink(
  link: Omit<LinkItem, "id" | "createdAt">,
): Promise<LinkItem> {
  const url = link.url.trim();
  if (!URL.canParse(url)) throw new Error("링크 주소가 올바르지 않습니다.");
  const folderId = Number(link.folderId);
  if (!Number.isInteger(folderId)) throw new Error("폴더를 선택하세요.");

  const { data, error } = await supabase
    .from("link")
    .insert({
      url,
      title: link.title || null,
      description: link.description || null,
      thumbnail_url: link.thumbnail || null,
      folder_id: folderId,
    })
    .select(LINK_COLUMNS)
    .single();

  if (error) throw new Error(`링크를 추가하지 못했습니다: ${error.message}`);
  return toLinkItem(data);
}
