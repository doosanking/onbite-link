import type { LinkItem } from "@/lib/mock-data";

export default function LinkCard({
  link,
  folderName,
}: {
  link: LinkItem;
  folderName?: string;
}) {
  const host = new URL(link.url).hostname.replace(/^www\./, "");

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full flex-col gap-2 rounded-xl border border-zinc-200 p-4 transition-shadow hover:shadow-md dark:border-zinc-800"
    >
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span className="truncate">{host}</span>
        {folderName && (
          <span className="ml-2 shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">
            {folderName}
          </span>
        )}
      </div>
      <h3 className="font-semibold">{link.title}</h3>
      <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
        {link.description}
      </p>
      <time className="mt-auto pt-2 text-xs text-zinc-400">{link.createdAt}</time>
    </a>
  );
}
