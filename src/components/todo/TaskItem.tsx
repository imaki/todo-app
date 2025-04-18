"use client";

import { Task } from "@/types/task";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
    task: Task;
    onToggleAction: (id: string) => void;
    onDeleteAction: (id: string) => void;
};

export default function TaskItem({ task, onToggleAction, onDeleteAction }: Props) {
    const [showNotificationOptions, setShowNotificationOptions] = useState(false);
    const [reminderTime, setReminderTime] = useState<string>("");

    // 通知設定オプション表示切替
    const handleNotificationClick = () => {
        setShowNotificationOptions(!showNotificationOptions);
    };

    // 通知時刻の変更
    const handleReminderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setReminderTime(e.target.value);
    };

    return (
        <div className="border p-2 rounded flex justify-between items-center">
            <div>
                <p className={task.completed ? "line-through text-gray-400" : ""}>
                    {task.title}
                </p>
                <p className="text-xs text-gray-500">
                    {task.priority} | {task.deadline}
                </p>
            </div>
            <div className="flex gap-2">
                <Button onClick={() => onToggleAction(task.id)}>✔</Button>
                <Button onClick={() => onDeleteAction(task.id)} variant="destructive">🗑</Button>

                {/* 通知設定ボタン（🔔） */}
                <Button onClick={handleNotificationClick}>🔔</Button>

                {/* 通知オプション表示 */}
                {showNotificationOptions && (
                    <div className="space-y-2 mt-2">
                        <select
                            className="border p-2 w-full"
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
                    </div>
                )}
            </div>
        </div>
    );
}
