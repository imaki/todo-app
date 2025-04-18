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
            reminderAt: reminderAt || null, // 通知時刻を追加
            completed: false,
            notified: false, // 通知済みかどうか（初期 false）
        };

        addTask(newTask);

        // フォーム初期化
        setTitle("");
        setDeadline("");
        setPriority("medium");
        setReminderAt(""); // 通知時刻リセット
    };

    return (
        <div className="space-y-2">
            <input
                className="border w-full p-2"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="date"
                className="border w-full p-2"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="border w-full p-2"
            >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>

            {/* 通知時刻設定（これも削除する） */}
            <input
                type="datetime-local"
                className="border w-full p-2"
                value={reminderAt}
                onChange={(e) => setReminderAt(e.target.value)}
                style={{ display: "none" }} // 表示しないように変更
            />

            <Button onClick={handleSubmit}>Add Task</Button>
        </div>
    );
}
