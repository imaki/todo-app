export type Priority = "high" | "medium" | "low";

// 🔁 繰り返し通知用
export type RepeatType = "none" | "daily" | "weekly";

// ⏰ 通知タイミングの種類
export type ReminderType =
    | "none"
    | "immediate"
    | "5min"
    | "10min"
    | "daily"
    | "weekly";

export type Task = {
    id: string;               // ユニークID（UUIDなど）
    title: string;            // タスクのタイトル
    priority: Priority;       // 優先度（high/medium/low）
    deadline: string;         // 締切日（ISO形式）
    completed: boolean;       // 完了フラグ

    // 🔔 通知関連（追加項目）
    reminderAt?: string | null;   // 通知時刻（例: "2025-04-19T16:30"）
    reminderType?: ReminderType; // 通知の種類（選択式）
    repeat?: RepeatType;         // 繰り返し（daily / weekly）
    notified?: boolean;          // 通知済みフラグ
};
