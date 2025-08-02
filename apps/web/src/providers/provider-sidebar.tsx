import { SidebarProvider } from "@workspace/ui/components/sidebar";

import { AppSidebar } from "@/components/app/app-sidebar";
import { AppTopbar } from "@/components/app/app-topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppTopbar />
      <AppSidebar />
      <main className="mx-auto flex h-screen w-full grow flex-col items-center pt-14 xl:container sm:p-4 sm:pt-20">
        {children}
      </main>
    </SidebarProvider>
  );
}
