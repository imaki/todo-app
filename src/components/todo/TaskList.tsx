"use client";

import { useTaskStore } from "@/store/taskStore";
import TaskItem from "./TaskItem";

export default function TaskList() {
    const tasks = useTaskStore((state) => state.tasks);
    const toggleTask = useTaskStore((state) => state.toggleTask);
    const deleteTask = useTaskStore((state) => state.deleteTask);

    return (
        <div className="space-y-2">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleAction={toggleTask}
                    onDeleteAction={deleteTask}
                    // 通知ボタンも渡す
                />
            ))}
        </div>
    );
}
