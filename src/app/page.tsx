// 📄 src/app/page.tsx
"use client";

import TaskInput from "@/components/todo/TaskInput";
import TaskList from "@/components/todo/TaskList";
import WorldClockSelector from "@/components/clock/WorldClockSelector";
import WorldClockDisplay from "@/components/clock/WorldClockDisplay";
import NotificationManager from "@/components/notification/NotificationManager";

import { useEffect } from "react";
import { useTaskStore } from "@/store/taskStore";
import { useAuthStore } from "@/store/authStore";
import { useTodos } from "@/hooks/useTodos"; // 🔥 Firestore同期用フック

export default function HomePage() {
    const tasks = useTaskStore((state) => state.tasks);
    const setTasksFromStorage = useTaskStore.setState;
    const user = useAuthStore((state) => state.user);

    // Firestoreとの同期を開始（ログインユーザーがいる場合）
    useTodos(); // 🔥 ← これがFirestoreとのリアルタイム同期

    // ※下記のlocalStorage処理はFirestoreと切り替えるなら不要になるが、ログインなし状態でも使いたいなら残してもOK
    useEffect(() => {
        const stored = localStorage.getItem("tasks");
        if (stored && !user) {
            const parsed = JSON.parse(stored);
            setTasksFromStorage({ tasks: parsed });
        }
    }, [setTasksFromStorage, user]);

    useEffect(() => {
        if (!user) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks, user]);

    return (
        <main className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">📝 Multi-Todo App</h1>

            <NotificationManager />

            <section className="space-y-2">
                <h2 className="text-xl font-semibold">🌍 World Clock</h2>
                <WorldClockSelector />
                <WorldClockDisplay />
            </section>

            <section className="space-y-2">
                <h2 className="text-xl font-semibold">✅ ToDo List</h2>
                <TaskInput />
                <TaskList />
            </section>
        </main>
    );
}

