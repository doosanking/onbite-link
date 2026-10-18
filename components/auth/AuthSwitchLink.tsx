import Link from "next/link";

type AuthSwitchLinkProps = {
  message: string;
  href: string;
  label: string;
};

export default function AuthSwitchLink({ message, href, label }: AuthSwitchLinkProps) {
  return (
    <p className="text-center text-sm text-[var(--text-sub)]">
      {message}{" "}
      <Link href={href} className="font-bold text-[var(--accent-text)] hover:underline">
        {label}
      </Link>
    </p>
  );
}
