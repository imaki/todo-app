"use client";

import TaskInput from "@/components/todo/TaskInput";
import TaskList from "@/components/todo/TaskList";
import { useEffect } from "react";
import { useTaskStore } from "@/store/taskStore";

export default function HomePage() {
    const tasks = useTaskStore((state) => state.tasks);
    const setTasksFromStorage = useTaskStore.setState; // Zustandのストア操作
    const saveTasks = useTaskStore.getState; // 状態取得

    // ✅ 初回マウント時に localStorage からタスクを読み込む
    useEffect(() => {
        const stored = localStorage.getItem("tasks");
        if (stored) {
            const parsed = JSON.parse(stored);
            setTasksFromStorage({ tasks: parsed });
        }
    }, []);

    // ✅ タスクが変化したら localStorage に保存
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <main className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">📝 ToDo App</h1>
            <TaskInput />
            <TaskList />
        </main>
    );
}
