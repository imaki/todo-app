export type Priority = "high" | "medium" | "low";

export type RepeatType = "none" | "daily" | "weekly"; // 🔁 繰り返し通知用

export type Task = {
    id: string;            // ユニークID（UUIDなど）
    title: string;         // タスクのタイトル
    priority: Priority;    // 優先度（high/medium/low）
    deadline: string;      // 締切日（ISO形式）
    completed: boolean;    // 完了フラグ

    // 🔔 通知関連（追加項目）
    reminderAt?: string | null; // 通知時刻（例: "2025-04-19T16:30"）
    repeat?: RepeatType;        // 通知の繰り返し（none / daily / weekly）
    notified?: boolean;         // 通知済みフラグ（既に通知済ならtrue）
};
