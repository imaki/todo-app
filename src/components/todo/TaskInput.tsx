"use client";

import { useState } from "react";
import { Task, Priority } from "@/types/task";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/store/taskStore"; // ← ✅ 追加

export default function TaskInput() {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState<Priority>("medium");
    const [deadline, setDeadline] = useState("");

    const addTask = useTaskStore((state) => state.addTask); // ✅ Zustandから関数取得

    const handleSubmit = () => {
        if (!title.trim()) return;

        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            priority,
            deadline,
            completed: false,
        };

        addTask(newTask); // ✅ Zustandの関数を直接呼び出す！

        // フォーム初期化
        setTitle("");
        setDeadline("");
        setPriority("medium");
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
            <Button onClick={handleSubmit}>Add Task</Button>
        </div>
    );
}
