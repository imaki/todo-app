export type Priority = "high" | "medium" | "low";

export type Todo = {
    id: string;
    title: string;
    priority: Priority;
    deadline: string;
    completed: boolean;
    createdAt: string;
    reminderAt?: string | null; // 🔔 通知オプション（追加）
    notified?: boolean;         // 🔔 通知済みフラグ（追加）
};
