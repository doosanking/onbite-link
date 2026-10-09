import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    ".env.local에 SUPABASE_URL과 SUPABASE_PUBLISHABLE_KEY를 설정한 뒤 개발 서버를 재시작하세요.",
  );
}

// 서버(Server Component, Server Action)에서만 사용한다.
export const supabase = createClient(supabaseUrl, supabaseKey);
