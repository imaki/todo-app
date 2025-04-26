// 完全版: src/components/todo/TodoList.tsx
"use client";

import { useTodoStore } from "@/store/todoStore";
import TaskItem from "./TaskItem";
import { useAuthStore } from "@/store/authStore";
import { updateTodo, deleteTodo } from "@/lib/firestoreUtils";

export default function TodoList() {
    const todos = useTodoStore((state) => state.todos);
    const user = useAuthStore((state) => state.user);

    const handleToggle = (id: string, current: boolean) => {
        if (!user?.uid) return;
        updateTodo(user.uid, id, { completed: !current });
    };

    const handleDelete = (id: string) => {
        if (!user?.uid) return;
        deleteTodo(user.uid, id);
    };

    return (
        <ul className="space-y-2">
            {todos.map((todo) => (
                <TaskItem
                    key={todo.id}
                    todo={todo}
                    onToggleAction={() => handleToggle(todo.id, todo.completed)}
                    onDeleteAction={() => handleDelete(todo.id)}
                />
            ))}
        </ul>
    );
}
