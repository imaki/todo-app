"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function Header() {
    const [isDark, setIsDark] = useState(false);

    // 初期モードを localStorage から取得
    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        }
    }, []);

    // モード切り替え
    const toggleTheme = () => {
        const html = document.documentElement;
        if (html.classList.contains("dark")) {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    return (
        <header className="flex justify-between items-center px-6 py-4 bg-background shadow">
            <h1 className="text-xl font-bold"> Multi-Todo App</h1>
            <Button onClick={toggleTheme} variant="ghost">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
        </header>
    );
}
