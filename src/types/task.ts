// src/types/task.ts

export type Priority = "high" | "medium" | "low";

export type Task = {
    id: string;            // ユニークID（UUIDなど）
    title: string;         // タスクのタイトル
    priority: Priority;    // 優先度（high/medium/low）
    deadline: string;      // 締切日（ISO文字列 "2025-04-15" など）
    completed: boolean;    // 完了フラグ
};
