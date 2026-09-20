import AppShell from "@/components/layout/AppShell";
import LinkForm from "@/components/link/LinkForm";

export default function NewLinkPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-[30px] font-bold leading-[1.2] text-[var(--text)]">새 링크 추가</h1>
        <LinkForm />
      </div>
    </AppShell>
  );
}
