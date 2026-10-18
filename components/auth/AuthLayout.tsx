import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center px-5 py-16">
      <div className="flex w-full max-w-[400px] flex-col gap-8">
        <Link href="/" className="text-center text-[30px] font-bold text-[var(--accent-text)]">
          🔖 한입 링크
        </Link>
        {children}
      </div>
    </main>
  );
}
