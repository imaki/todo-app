"use client";
import { useThemeStore } from "@/store/themeStore";
import { Button } from "./button";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <Button onClick={toggleTheme}>
            {theme === "light" ? "🌞 Light" : "🌙 Dark"}
        </Button>
    );
}
