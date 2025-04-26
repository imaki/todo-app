// 1. 📄 src/types/todo.ts
// ================================
export type Priority = "high" | "medium" | "low";

export type Todo = {
    id: string;
    title: string;
    priority: Priority;
    deadline: string;
    completed: boolean;
    createdAt: string;
    reminderAt?: string | null;
    notified?: boolean;
};

