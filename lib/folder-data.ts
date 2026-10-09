import { connection } from "next/server";
import type { Folder } from "@/lib/mock-data";
import { supabase } from "@/lib/supabase";

export async function getFolders(): Promise<Folder[]> {
  await connection();

  const { data, error } = await supabase
    .from("folder")
    .select("id, name")
    .order("create_at", { ascending: true })
    .order("id", { ascending: true });

  if (error) throw new Error(`폴더 목록을 불러오지 못했습니다: ${error.message}`);
  return data.map((row) => ({ id: String(row.id), name: row.name, count: 0 }));
}
