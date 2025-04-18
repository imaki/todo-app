"use client";

import TaskInput from "@/components/todo/TaskInput";
import TaskList from "@/components/todo/TaskList";
import WorldClockSelector from "@/components/clock/WorldClockSelector";
import WorldClockDisplay from "@/components/clock/WorldClockDisplay";

import { useEffect } from "react";
import { useTaskStore } from "@/store/taskStore";

export default function HomePage() {
    const tasks = useTaskStore((state) => state.tasks);
    const setTasksFromStorage = useTaskStore.setState;
    const saveTasks = useTaskStore.getState;

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
            <h1 className="text-2xl font-bold">📝 Multi-Todo App</h1>

            {/* 🌍 世界時計機能をここに追加！ */}
            <section className="space-y-2">
                <h2 className="text-xl font-semibold">🌍 World Clock</h2>
                <WorldClockSelector />
                <WorldClockDisplay />
            </section>

            {/* ✅ ToDo 機能 */}
            <section className="space-y-2">
                <h2 className="text-xl font-semibold">✅ ToDo List</h2>
                <TaskInput />
                <TaskList />
            </section>
        </main>
    );
}
