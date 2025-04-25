// 📄 src/components/todo/TaskList.tsx
"use client";

import { useTaskStore } from "@/store/taskStore";
import TaskItem from "./TaskItem";
import { useAuthStore } from "@/store/authStore";
import { updateTodo, deleteTodo } from "@/lib/firestoreUtils";

export default function TaskList() {
    const tasks = useTaskStore((state) => state.tasks);
    const user = useAuthStore((state) => state.user);

    const handleToggle = (id: string, completed: boolean) => {
        if (!user?.uid) return;
        updateTodo(user.uid, id, { completed: !completed });
    };

    const handleDelete = (id: string) => {
        if (!user?.uid) return;
        deleteTodo(user.uid, id);
    };

    return (
        <div className="space-y-2">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleAction={() => handleToggle(task.id, task.completed)}
                    onDeleteAction={() => handleDelete(task.id)}
                    // 通知ボタンなどがある場合はここに追加
                />
            ))}
        </div>
    );
}
