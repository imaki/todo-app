// src/components/layout/AppLayout.tsx
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
            <Footer />
        </div>
    );
}
