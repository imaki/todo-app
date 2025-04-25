// 📄 src/components/todo/TodoList.tsx
"use client";

import { useTodoStore } from "@/store/todoStore";

export default function TodoList() {
    const todos = useTodoStore((state) => state.todos);
    console.log("Zustandから受け取ったtodos:", todos); // ここで配列が正しく受け取れているか確認

    return (
        <div className="p-4 border bg-white dark:bg-gray-800 text-black dark:text-white">
            <h2>タスク一覧 (デバッグ表示)</h2>
            <ul className="space-y-2">
                {/* todos 配列をマップしてリスト表示 */}
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {/* タスクデータを JSON 形式で表示 */}
                        <pre>{JSON.stringify(todo, null, 2)}</pre>
                    </li>
                ))}
            </ul>
        </div>
    );
}
