import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
    theme: Theme;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
    theme: (localStorage.getItem("theme") as Theme) || "light",
    toggleTheme: () => {
        const current = get().theme;
        const next = current === "light" ? "dark" : "light";
        localStorage.setItem("theme", next);
        set({ theme: next });
    },
}));
