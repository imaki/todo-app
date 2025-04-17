//src/store/taskStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '@/types/task';

export type SortBy = 'priority' | 'deadline';

interface TaskStore {
    tasks: Task[];
    sortBy: SortBy;
    addTask: (task: Task) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    setSortBy: (sortBy: SortBy) => void;
}

export const useTaskStore = create<TaskStore>()(
    persist(
        (set) => ({
            tasks: [],
            sortBy: 'priority',
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
            setSortBy: (sortBy) => set(() => ({ sortBy })),
        }),
        {
            name: 'tasks',
        }
    )
);
