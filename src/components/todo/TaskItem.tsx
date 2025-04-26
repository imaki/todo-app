//src/components/todo/TaskItem.tsx
"use client";

import { Task } from "@/types/task";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { updateTodo } from "@/lib/firestoreUtils";

type Props = {
    todo: Task;
    onToggleAction: (id: string) => void;
    onDeleteAction: (id: string) => void;
};

export default function TaskItem({ todo, onToggleAction, onDeleteAction }: Props) {
    const [showNotificationOptions, setShowNotificationOptions] = useState(false);
    const [reminderTime, setReminderTime] = useState<string>(todo.reminderAt || "");
    const user = useAuthStore((state) => state.user);

    const handleNotificationClick = () => {
        setShowNotificationOptions(!showNotificationOptions);
    };

    const handleReminderChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setReminderTime(value);

        if (user?.uid) {
            await updateTodo(user.uid, todo.id, {
                reminderAt: value === "none" ? null : value,
                notified: false,
            });
        }
    };

    return (
        <li className="border p-2 rounded flex justify-between items-center">
            <div>
                <p className={todo.completed ? "line-through text-gray-400" : ""}>{todo.title}</p>
                <p className="text-xs text-gray-500">{todo.priority} | {todo.deadline}</p>
                {todo.reminderAt && (
                    <p className="text-xs text-green-500">🔔 {todo.reminderAt}</p>
                )}
            </div>

            <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                    <Button onClick={() => onToggleAction(todo.id)}>✔</Button>
                    <Button onClick={() => onDeleteAction(todo.id)} variant="destructive">🗑</Button>
                    <Button onClick={handleNotificationClick}>🔔</Button>
                </div>

                {showNotificationOptions && (
                    <select
                        className="border p-1 w-full mt-1
            bg-white text-black
            dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        value={reminderTime}
                        onChange={handleReminderChange}
                    >
                        <option value="none">No reminder</option>
                        <option value="immediate">Immediately</option>
                        <option value="5min">5 minutes before</option>
                        <option value="10min">10 minutes before</option>
                        <option value="daily">Daily reminder</option>
                        <option value="weekly">Weekly reminder</option>
                    </select>
                )}
            </div>
        </li>
    );
}
