import { Task } from "@/types/task";
import { Button } from "@/components/ui/button";

type Props = {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: Props) {
    return (
        <div className="border p-2 rounded flex justify-between items-center">
            <div>
                <p className={task.completed ? "line-through text-gray-400" : ""}>
                    {task.title}
                </p>
                <p className="text-xs text-gray-500">
                    {task.priority} | {task.deadline}
                </p>
            </div>
            <div className="flex gap-2">
                <Button onClick={() => onToggle(task.id)}>✔</Button>
                <Button onClick={() => onDelete(task.id)} variant="destructive">🗑</Button>
            </div>
        </div>
    );
}
