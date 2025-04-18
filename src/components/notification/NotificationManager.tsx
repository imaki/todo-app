// 📄 src/components/notification/NotificationManager.tsx
"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/store/taskStore";

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

        // ✅ 通知をスケジューリング
        tasks.forEach((task) => {
            if (
                task.reminderAt &&
                !task.completed &&
                !task.notified
            ) {
                const now = new Date();
                const reminderTime = new Date(task.reminderAt);
                const delay = reminderTime.getTime() - now.getTime();

                if (delay > 0) {
                    setTimeout(() => {
                        new Notification("🔔 Reminder", {
                            body: `${task.title} の時間になりました！`,
                        });

                        // ✅ 通知済みフラグを更新
                        updateTask({ ...task, notified: true });
                    }, delay);
                }
            }
        });
    }, [tasks, updateTask]); // ✅ 依存配列にupdateTaskを追加

    return null;
}
