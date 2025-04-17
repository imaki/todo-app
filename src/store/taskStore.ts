import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task } from "@/types/task";

// ✅ 並び替え条件の型定義
export type SortBy = "priority" | "deadline";

interface TaskStore {
    tasks: Task[];
    sortBy: SortBy; // ✅ 並び替え状態
    addTask: (task: Task) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    setSortBy: (sortBy: SortBy) => void; // ✅ 並び替え変更関数
}

// ✅ Zustandストア本体
export const useTaskStore = create<TaskStore>()(
    persist(
        (set) => ({
            tasks: [],
            sortBy: "priority", // ✅ 初期並び順
            addTask: (task) =>
                set((state) => ({
                    tasks: [...state.tasks, task],
                })),
            toggleTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === id ? { ...t, completed: !t.completed } : t
                    ),
                })),
            deleteTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.filter((t) => t.id !== id),
                })),
            setSortBy: (sortBy) => set(() => ({ sortBy })), // ✅ 並び順変更
        }),
        {
            name: "tasks", // localStorageのキー
        }
    )
);
