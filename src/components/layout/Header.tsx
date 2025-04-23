// 📄 src/components/layout/Header.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore"; // ✅ Zustandの認証状態取得

export default function Header() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user); // ログイン状態取得
    const [isDark, setIsDark] = useState(false);

    // 初期テーマ取得
    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        }
    }, []);

    // テーマ切替処理
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

    // ログアウト処理
    const handleLogout = async () => {
        await signOut(auth);
        router.push("/auth/login");
    };

    return (
        <header className="flex justify-between items-center px-6 py-4 bg-background shadow">
            <h1 className="text-xl font-bold">Multi-Todo App</h1>
            <div className="flex items-center gap-3">
                <Button onClick={toggleTheme} variant="ghost">
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>

                {/* ログイン状態によって表示内容を変更 */}
                {user ? (
                    <>
                        <span className="text-sm text-gray-500">{user.email}</span>
                        <Button onClick={handleLogout} variant="outline">
                            ログアウト
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => router.push("/auth/login")} variant="default">
                            ログイン
                        </Button>
                        <Button onClick={() => router.push("/auth/register")} variant="secondary">
                            登録
                        </Button>
                    </>
                )}
            </div>
        </header>
    );
}
