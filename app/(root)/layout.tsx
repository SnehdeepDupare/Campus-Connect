import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import LeftSidebar from "@/components/shared/sidebar";
import Bottombar from "@/components/shared/bottombar";
import Topbar from "@/components/shared/topbar";
import { Toaster } from "@/components/ui/sonner";
import { RightSidebar } from "@/components/shared/right-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campus Conect",
  description: "Social Application for College Students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Topbar />

            <main className="flex flex-row">
              <LeftSidebar />

              <section className="flex min-h-screen flex-1 flex-col items-center px-5 pb-10 pt-20 md:pt-10 max-md:pb-32 sm:px-10">
                <div className="w-full max-w-4xl">{children}</div>
              </section>

              <RightSidebar />
            </main>

            <Bottombar />

            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
