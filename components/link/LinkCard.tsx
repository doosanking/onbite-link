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
      className="card-hover flex h-full flex-col gap-2 rounded-[16px] bg-[var(--card)] p-5"
    >
      {link.thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element -- 외부 임의 도메인 이미지라 next/image 대신 사용
        <img
          src={link.thumbnail}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          className="aspect-[1.91/1] w-full rounded-[10px] bg-[var(--hover-bg)] object-cover"
        />
      )}
      <div className="flex items-center justify-between text-[13px text-[var(--text-sub)]">
        <span className="truncate">{host}</span>
        {folderName && (
          <span className="ml-2 shrink-0 rounded-[8px] bg-[var(--hover-bg)] px-2.5 py-1 text-[13px] font-bold text-[var(--accent-text)]">
            {folderName}
          </span>
        )}
      </div>
      <h3 className="text-[20px] font-bold leading-[1.4] text-[var(--text)]">
        {link.title}
      </h3>
      <p className="line-clamp-2 text-[15px] leading-[1.5] text-[var(--text-sub)]">
        {link.description}
      </p>
      <time className="mt-auto pt-2 text-[13px] text-[var(--text-sub)]">
        {link.createdAt}
      </time>
    </a>
  );
}
