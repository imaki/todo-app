// 📄 src/app/layout.tsx
import "@/app/globals.css";
import AppLayout from "@/components/layout/AppLayout";
import ClientWrapper from "@/components/ClientWrapper"; // ✅ 追加
import type { Metadata } from "next";
import { fontSans, fontMono } from "@/lib/fonts";

export const metadata: Metadata = {
    title: "Multi-Todo App",
    description: "タスク・時計・メモ・通知の便利アプリ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`} suppressHydrationWarning>
        <head>
            {/* ✅ ダークモードを最初から反映するためのスクリプト */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
              (function() {
                try {
                  const theme = localStorage.getItem("theme");
                  if (theme === "dark") {
                    document.documentElement.classList.add("dark");
                  }
                } catch(e) {}
              })();
            `,
                }}
            />
        </head>
        <body className="bg-background text-foreground">
        <ClientWrapper>
            <AppLayout>{children}</AppLayout>
        </ClientWrapper>
        </body>
        </html>
    );
}
