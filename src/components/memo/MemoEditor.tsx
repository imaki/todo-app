"use client";

import { useState } from "react";
import { useMemoStore } from "@/store/memoStore";
import { Memo } from "@/types/memo";
import { Button } from "@/components/ui/button";

export default function MemoEditor() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const addMemo = useMemoStore((state) => state.addMemo);

    const handleAdd = () => {
        if (!title.trim() && !body.trim()) return;

        const newMemo: Memo = {
            id: crypto.randomUUID(),
            title,
            body,
            createdAt: new Date().toISOString(),
        };

        addMemo(newMemo);

        setTitle("");
        setBody("");
    };

    return (
        <div className="space-y-2">
            <input
                type="text"
                placeholder="Memo title"
                className="border w-full p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Write your memo..."
                className="border w-full p-2 h-24"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <Button onClick={handleAdd}>Add Memo</Button>
        </div>
    );
}
