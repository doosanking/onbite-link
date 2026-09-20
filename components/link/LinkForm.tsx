"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FolderSelect from "@/components/folder/FolderSelect";
import { useFolders } from "@/components/folder/FolderProvider";
import { useLinks } from "@/components/link/LinkProvider";

type OgData = { title?: string; description?: string; image?: string; url?: string };

export default function LinkForm() {
  const { folders } = useFolders();
  const { addLink } = useLinks();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  return (
    <form
      className="flex flex-col gap-[14px] rounded-[16px] bg-[var(--card)] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.06)]"
      onSubmit={async (e) => {
        e.preventDefault();
        if (pending) return;
        const form = new FormData(e.currentTarget);
        const inputUrl = String(form.get("url")).trim();
        const folderId = String(form.get("folderId"));

        setPending(true);
        let og: OgData = {};
        try {
          const res = await fetch(`/api/og?url=${encodeURIComponent(inputUrl)}`);
          if (res.ok) og = await res.json();
        } catch {
          // 정보를 가져오지 못해도 링크는 저장한다.
        }

        const url = og.url || inputUrl;
        addLink({
          title: og.title || new URL(url).hostname.replace(/^www\./, ""),
          description: og.description ?? "",
          url,
          thumbnail: og.image || undefined,
          folderId,
        });
        router.push(`/folder/${folderId}`);
      }}
    >
      <label className="flex flex-col gap-2 text-sm font-bold text-[var(--text)]">
        링크
        <input
          type="url"
          name="url"
          required
          placeholder="https://example.com"
          className="field rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-3.5 py-3 text-base font-normal text-[var(--text)]"
        />
      </label>
      <FolderSelect folders={folders} />
      <button
        type="submit"
        disabled={pending}
        className="btn-primary mt-2 rounded-[12px] bg-[var(--accent)] px-6 py-3.5 text-base font-bold text-white disabled:opacity-60"
      >
        {pending ? "링크 정보를 가져오는 중..." : "확인"}
      </button>
    </form>
  );
}
