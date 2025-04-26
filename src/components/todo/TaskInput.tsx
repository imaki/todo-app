// 5. 📄 src/components/todo/TaskInput.tsx
// ================================
"use client";
import { useState } from "react";
import { Priority } from "@/types/todo";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { addTodo } from "@/lib/firestoreUtils";
import { formatISO } from "date-fns";

export default function TaskInput() {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState<Priority>("medium");
    const [deadline, setDeadline] = useState("");
    const [reminderAt, setReminderAt] = useState("");
    const user = useAuthStore((state) => state.user);

    const handleSubmit = async () => {
        if (!title || !deadline || !user?.uid) return;
        await addTodo(user.uid, {
            title,
            priority,
            deadline,
            reminderAt: reminderAt || null,
            completed: false,
            notified: false,
            createdAt: formatISO(new Date()),
        });
        setTitle("");
        setDeadline("");
        setPriority("medium");
        setReminderAt("");
    };

    return (
        <div className="space-y-2">
            <input className="border w-full p-2" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="date" className="border w-full p-2" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            <select className="border w-full p-2" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
            <input type="datetime-local" className="hidden" value={reminderAt} onChange={(e) => setReminderAt(e.target.value)} />
            <Button onClick={handleSubmit}>Add Task</Button>
        </div>
    );
}
