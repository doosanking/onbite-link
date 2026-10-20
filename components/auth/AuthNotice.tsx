type AuthNoticeProps = {
  children: React.ReactNode;
  tone?: "info" | "error";
};

export default function AuthNotice({ children, tone = "info" }: AuthNoticeProps) {
  const color = tone === "error" ? "text-[var(--error)]" : "text-[var(--text-sub)]";
  return <p className={`text-sm leading-[1.5] ${color}`}>{children}</p>;
}
