// 📄 src/components/notification/NotificationManager.tsx
"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/store/taskStore";
import { Task } from "@/types/task";

export default function NotificationManager() {
    const tasks = useTaskStore((state) => state.tasks);
    const updateTask = useTaskStore((state) => state.updateTask);

    useEffect(() => {
        // ✅ 通知許可を確認・リクエスト
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then((permission) => {
                if (permission !== "granted") {
                    console.warn("通知が許可されていません");
                }
            });
        }

        // ✅ 通知スケジューリング
        tasks.forEach((task: Task) => {
            if (task.notified || task.completed || !task.deadline || task.reminderType === "none") return;

            const deadline = new Date(task.deadline);
            const now = new Date();
            let reminderTime: Date | null = null;

            switch (task.reminderType) {
                case "immediate":
                    reminderTime = now;
                    break;
                case "5min":
                    reminderTime = new Date(deadline.getTime() - 5 * 60 * 1000);
                    break;
                case "10min":
                    reminderTime = new Date(deadline.getTime() - 10 * 60 * 1000);
                    break;
                case "daily":
                    reminderTime = new Date(deadline);
                    reminderTime.setHours(9, 0, 0, 0); // 毎日9時など
                    break;
                case "weekly":
                    reminderTime = new Date(deadline);
                    reminderTime.setHours(10, 0, 0, 0); // 毎週10時など
                    break;
                default:
                    reminderTime = null;
            }

            if (reminderTime && reminderTime > now) {
                const delay = reminderTime.getTime() - now.getTime();

                setTimeout(() => {
                    new Notification("🔔 Reminder", {
                        body: `${task.title} の時間になりました！`,
                    });

                    updateTask({ ...task, notified: true });
                }, delay);
            }
        });
    }, [tasks, updateTask]);

    return null;
}
