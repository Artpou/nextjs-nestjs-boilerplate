import "@workspace/ui/globals.css";

import { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react";
import { cn } from "@workspace/ui/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { auth } from "@/auth";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import SidebarProvider from "@/providers/SidebarProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={cn(
          "dark min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <SessionProvider session={session} refetchOnWindowFocus={false}>
            <ReactQueryProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </ReactQueryProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
