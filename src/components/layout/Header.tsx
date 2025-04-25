"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore"; // ✅ Zustand authentication state

export default function Header() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user); // get login status
    const [isDark, setIsDark] = useState(false);

    // Get initial theme
    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        }
    }, []);

    // Toggle theme handler
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

    // Logout handler
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

                {/* Conditional UI based on login status */}
                {user ? (
                    <>
                        <span className="text-sm text-gray-500">{user.email}</span>
                        <Button onClick={handleLogout} variant="outline">
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => router.push("/auth/login")} variant="default">
                            Login
                        </Button>
                        <Button onClick={() => router.push("/auth/register")} variant="secondary">
                            Register
                        </Button>
                    </>
                )}
            </div>
        </header>
    );
}
