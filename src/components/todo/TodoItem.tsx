//src/components/todo/TaskItem.tsx
"use client";

import { Todo } from "@/types/todo";
import { useAuthStore } from "@/store/authStore";
import { updateTodo, deleteTodo } from "@/lib/firestoreUtils";
import { Button } from "@/components/ui/button";

type Props = {
    todo: Todo;
};

export default function TodoItem({ todo }: Props) {
    const user = useAuthStore((state) => state.user);

    const handleToggle = () => {
        if (!user?.uid) return;
        updateTodo(user.uid, todo.id, { completed: !todo.completed });
    };

    const handleDelete = () => {
        if (!user?.uid) return;
        deleteTodo(user.uid, todo.id);
    };

    return (
        <li className="flex items-center justify-between border p-2 rounded">
            <div>
                <p className={`font-semibold ${todo.completed ? "line-through" : ""}`}>
                    {todo.title}
                </p>
                <p className="text-sm text-gray-500">{todo.deadline}</p>
                <p className="text-xs text-blue-600">Priority: {todo.priority}</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={handleToggle}>
                    {todo.completed ? "Undo" : "Done"}
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </li>
    );
}
