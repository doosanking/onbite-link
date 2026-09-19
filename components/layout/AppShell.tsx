import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { folders, links } from "@/lib/mock-data";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={folders} totalCount={links.length} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
