"use server";

import type { Folder } from "@/lib/mock-data";
import { supabase } from "@/lib/supabase";

export async function createFolder(name: string): Promise<Folder> {
  const trimmed = name.trim();
  if (!trimmed || trimmed.length > 20) throw new Error("폴더 이름이 올바르지 않습니다.");

  const { data, error } = await supabase
    .from("folder")
    .insert({ name: trimmed })
    .select("id, name")
    .single();

  if (error) throw new Error(`폴더를 추가하지 못했습니다: ${error.message}`);
  return { id: String(data.id), name: data.name, count: 0 };
}
