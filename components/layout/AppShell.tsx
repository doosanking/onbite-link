import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { links } from "@/lib/mock-data";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar totalCount={links.length} />
        <main className="min-w-0 flex-1 px-5 pt-9 pb-16">
          <div className="mx-auto max-w-[640px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
