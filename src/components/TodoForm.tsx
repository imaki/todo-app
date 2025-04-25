// 📄 src/components/TodoForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { addTodo } from "@/lib/firestoreUtils";
import { Priority } from "@/types/todo";
import { formatISO } from "date-fns";

export default function TodoForm() {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState<Priority>("medium");
    const [deadline, setDeadline] = useState("");
    const user = useAuthStore((state) => state.user);

    const handleAdd = async () => {
        if (!title || !deadline || !user?.uid) return;

        await addTodo(user.uid, {
            title,
            priority,
            deadline,
            completed: false,
            createdAt: formatISO(new Date()),
        });

        setTitle("");
        setDeadline("");
        setPriority("medium");
    };

    return (
        <div className="space-y-2">
            <Input
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />
            <select
                className="w-full border rounded p-2"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
            >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
            <Button onClick={handleAdd}>Add Task</Button>
        </div>
    );
}
