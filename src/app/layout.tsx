// src/app/layout.tsx
import "@/app/globals.css";
import AppLayout from "@/components/layout/AppLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Multi-Todo App",
    description: "タスク・時計・メモ・通知の便利アプリ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <AppLayout>{children}</AppLayout>
        </body>
        </html>
    );
}
