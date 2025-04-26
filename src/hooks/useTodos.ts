// 4. 📄 src/hooks/useTodos.ts
// ================================
import { useEffect } from "react";
import { subscribeToTodos } from "@/lib/firestoreUtils";
import { useAuthStore } from "@/store/authStore";
import { useTodoStore } from "@/store/todoStore";
import { Todo } from "@/types/todo";

export const useTodos = () => {
    const user = useAuthStore((state) => state.user);
    const setTodos = useTodoStore((state) => state.setTodos);

    useEffect(() => {
        if (!user?.uid) return;
        const unsubscribe = subscribeToTodos(user.uid, (todos: Todo[]) => {
            setTodos(todos);
        });
        return () => unsubscribe();
    }, [user?.uid, setTodos]);
};
