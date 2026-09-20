import { isIP } from "node:net";
import type { NextRequest } from "next/server";

const MAX_HTML_BYTES = 512 * 1024;

function isPrivateHost(hostname: string) {
  const host = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) return true;
  if (isIP(host) === 4) {
    const [a, b] = host.split(".").map(Number);
    return (
      a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)
    );
  }
  if (isIP(host) === 6) return host === "::1" || host === "::" || /^(fc|fd|fe80)/.test(host);
  return false;
}

function decodeEntities(text: string) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

function getAttr(tag: string, name: string) {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? decodeEntities(m[1] ?? m[2] ?? m[3] ?? "") : undefined;
}

function parseMeta(html: string) {
  const meta: Record<string, string> = {};
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const key = (getAttr(tag, "property") ?? getAttr(tag, "name"))?.toLowerCase();
    const content = getAttr(tag, "content");
    if (key && content && !(key in meta)) meta[key] = content;
  }
  return meta;
}

async function readLimited(res: Response) {
  const reader = res.body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder();
  let html = "";
  let size = 0;
  while (size < MAX_HTML_BYTES) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    html += decoder.decode(value, { stream: true });
    if (html.includes("</head>")) break;
  }
  await reader.cancel().catch(() => {});
  return html;
}

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("url");
  let target: URL;
  try {
    target = new URL(raw ?? "");
  } catch {
    return Response.json({ error: "올바른 URL이 아닙니다." }, { status: 400 });
  }
  if (!["http:", "https:"].includes(target.protocol) || isPrivateHost(target.hostname)) {
    return Response.json({ error: "지원하지 않는 URL입니다." }, { status: 400 });
  }

  try {
    const res = await fetch(target, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0)", accept: "text/html" },
      signal: AbortSignal.timeout(8000),
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const html = await readLimited(res);
    const meta = parseMeta(html);
    const titleTag = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];

    let image: string | undefined = meta["og:image"] ?? meta["og:image:url"] ?? meta["twitter:image"];
    if (image) {
      try {
        image = new URL(image, res.url).href;
      } catch {
        image = undefined;
      }
    }

    let url = target.href;
    if (meta["og:url"]) {
      try {
        url = new URL(meta["og:url"], res.url).href;
      } catch {}
    }

    return Response.json({
      title: meta["og:title"] ?? meta["twitter:title"] ?? (titleTag ? decodeEntities(titleTag) : ""),
      description: meta["og:description"] ?? meta["description"] ?? meta["twitter:description"] ?? "",
      image: image ?? "",
      url,
    });
  } catch {
    return Response.json({ error: "링크 정보를 가져오지 못했습니다." }, { status: 502 });
  }
}
