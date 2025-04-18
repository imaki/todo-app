"use client";

import { useMemoStore } from "@/store/memoStore";
import { Button } from "@/components/ui/button";

export default function MemoList() {
    const memos = useMemoStore((state) => state.memos);
    const deleteMemo = useMemoStore((state) => state.deleteMemo);

    if (memos.length === 0) {
        return <p className="text-gray-500">No memos yet.</p>;
    }

    return (
        <div className="space-y-4">
            {memos.map((memo) => (
                <div
                    key={memo.id}
                    className="border p-3 rounded shadow-sm space-y-1 bg-white"
                >
                    <div className="text-lg font-semibold">{memo.title}</div>
                    <div className="text-sm text-gray-700 whitespace-pre-wrap">
                        {memo.body}
                    </div>
                    <div className="text-xs text-gray-400">
                        {new Date(memo.createdAt).toLocaleString()}
                    </div>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteMemo(memo.id)}
                    >
                        Delete
                    </Button>
                </div>
            ))}
        </div>
    );
}
