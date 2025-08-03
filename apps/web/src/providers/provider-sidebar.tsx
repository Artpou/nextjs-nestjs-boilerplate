import { SidebarProvider } from '@workspace/ui/components/sidebar';

import { AppSidebar } from '@/components/app/app-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="mx-auto flex h-screen w-full grow flex-col items-center xl:container sm:p-4">
        {children}
      </main>
    </SidebarProvider>
  );
}
