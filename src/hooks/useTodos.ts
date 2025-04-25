// 📄 src/hooks/useTodos.ts

import { useEffect } from "react";
import { subscribeToTodos } from "@/lib/firestoreUtils";
import { useAuthStore } from "@/store/authStore";
import { useTodoStore } from "@/store/todoStore";
import { Todo } from "@/types/todo";

// Firestoreのタスクを購読して、Zustandストアに反映する
export const useTodos = () => {
    const user = useAuthStore((state) => state.user);
    const setTodos = useTodoStore((state) => state.setTodos);

    useEffect(() => {
        if (!user?.uid) {
            console.log("❌ user.uid が未定義のため Firestore購読を中止");
            return;
        }

        console.log("✅ Firestore購読開始: uid =", user.uid);

        // Firestoreにリアルタイム接続
        const unsubscribe = subscribeToTodos(user.uid, (todos: Todo[]) => {
            console.log("📥 Firestoreから取得:", todos);
            setTodos(todos);
        });

        // クリーンアップ
        return () => {
            console.log("👋 Firestore購読解除");
            unsubscribe();
        };
    }, [user?.uid, setTodos]);
};
