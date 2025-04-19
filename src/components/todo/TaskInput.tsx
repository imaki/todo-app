// 📄 src/components/todo/TaskInput.tsx
"use client";

import { useState } from "react";
import { Task, Priority } from "@/types/task";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/store/taskStore";

export default function TaskInput() {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState<Priority>("medium");
    const [deadline, setDeadline] = useState("");
    const [reminderAt, setReminderAt] = useState(""); // 通知時刻の状態

    const addTask = useTaskStore((state) => state.addTask);

    const handleSubmit = () => {
        if (!title.trim()) return;

        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            priority,
            deadline,
            reminderAt: reminderAt || null,
            completed: false,
            notified: false,
        };

        addTask(newTask);

        // フォーム初期化
        setTitle("");
        setDeadline("");
        setPriority("medium");
        setReminderAt("");
    };

    return (
        <div className="space-y-2">
            {/* タイトル入力 */}
            <input
                className="border w-full p-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* 締切日入力 */}
            <input
                type="date"
                className="border w-full p-2 dark:bg-gray-800 dark:text-white dark:border-gray-600
                   [&::-webkit-calendar-picker-indicator]:invert"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />

            {/* 優先度選択 */}
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="border w-full p-2
                   bg-white text-black
                   dark:bg-gray-800 dark:text-white dark:border-gray-600"
            >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>

            {/* 🔕 通知カレンダー入力（現在は非表示） */}
            <input
                type="datetime-local"
                className="hidden"
                value={reminderAt}
                onChange={(e) => setReminderAt(e.target.value)}
            />

            <Button onClick={handleSubmit}>Add Task</Button>
        </div>
    );
}
