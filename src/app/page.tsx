// 📄 src/app/page.tsx
"use client";

import TaskInput from "@/components/todo/TaskInput";
import TaskList from "@/components/todo/TaskList";
import WorldClockSelector from "@/components/clock/WorldClockSelector";
import WorldClockDisplay from "@/components/clock/WorldClockDisplay";
import NotificationManager from "@/components/notification/NotificationManager";

import { useEffect } from "react";
import { useTodoStore } from "@/store/todoStore"; // ✅ todoStoreを使用
import { useAuthStore } from "@/store/authStore";
import { useTodos } from "@/hooks/useTodos"; // ✅ Firestore同期

export default function HomePage() {
    const todos = useTodoStore((state) => state.todos);
    const setTodos = useTodoStore((state) => state.setTodos); // ✅ setTodos に直す！setStateじゃない
    const user = useAuthStore((state) => state.user);

    useTodos(); // Firestore同期開始

    // 未ログイン時のみ localStorage を使用
    useEffect(() => {
        const stored = localStorage.getItem("todos"); // ✅ localStorageキー名も "todos" に統一
        if (stored && !user) {
            const parsed = JSON.parse(stored);
            setTodos(parsed); // ✅ { todos: parsed } ではない！parsedだけ渡す
        }
    }, [setTodos, user]);

    useEffect(() => {
        if (!user) {
            localStorage.setItem("todos", JSON.stringify(todos)); // ✅ 同じく "todos"
        }
    }, [todos, user]);

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
