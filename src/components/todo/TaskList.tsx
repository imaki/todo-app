"use client";

import { useTaskStore } from "@/store/taskStore";
import TaskItem from "./TaskItem";
import { Task } from "@/types/task";

const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3,
};

export default function TaskList() {
    const tasks = useTaskStore((state) => state.tasks);
    const sortBy = useTaskStore((state) => state.sortBy); // ✅ 並び替え基準
    const toggleTask = useTaskStore((state) => state.toggleTask);
    const deleteTask = useTaskStore((state) => state.deleteTask);

    // ✅ 並び替え処理
    const sortedTasks = [...tasks].sort((a: Task, b: Task) => {
        if (sortBy === "priority") {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        } else {
            return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        }
    });

    return (
        <div className="space-y-2">
            {sortedTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                />
            ))}
        </div>
    );
}
