import AppShell from "@/components/layout/AppShell";
import LinkForm from "@/components/link/LinkForm";
import { folders } from "@/lib/mock-data";

export default function NewLinkPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-xl font-bold">새 링크 추가</h1>
        <LinkForm folders={folders} />
      </div>
    </AppShell>
  );
}
