import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task } from "@/types/task";

// ✅ 並び替え条件の型定義
export type SortBy = "priority" | "deadline";

interface TaskStore {
    tasks: Task[];
    sortBy: SortBy;
    addTask: (task: Task) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    updateTask: (task: Task) => void; // ✅ 🔔 通知用に追加
    setSortBy: (sortBy: SortBy) => void;
}

// ✅ Zustandストア本体
export const useTaskStore = create<TaskStore>()(
    persist(
        (set) => ({
            tasks: [],
            sortBy: "priority",
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
            updateTask: (task) =>
                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === task.id ? task : t
                    ),
                })),
            setSortBy: (sortBy) => set(() => ({ sortBy })),
        }),
        {
            name: "tasks", // localStorageのキー
        }
    )
);
