"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { create } from "zustand";

// ✅ Zustand用の型定義
type DebugState = {
    count: number;
    increase: () => void;
};

// ✅ Zustandストア作成（型付き）
const useDebugStore = create<DebugState>((set) => ({
    count: 0,
    increase: () =>
        set((state) => ({
            count: state.count + 1,
        })),
}));

export default function AdminDebugPage() {
    const [count, setCount] = useState(0);
    const [storageValue, setStorageValue] = useState<string | null>(null);
    const zustandCount = useDebugStore((state) => state.count);
    const increaseZustand = useDebugStore((state) => state.increase);
    const [apiResult, setApiResult] = useState<string>("未取得");

    useEffect(() => {
        const saved = localStorage.getItem("debugTest");
        setStorageValue(saved);
    }, []);

    const handleNotify = () => {
        if (Notification.permission === "granted") {
            new Notification("✅ Notification is working!");
        } else {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification("✅ Notification enabled!");
                }
            });
        }
    };

    const handleStorage = () => {
        localStorage.setItem("debugTest", "✅ Saved!");
        setStorageValue("✅ Saved!");
    };

    const handleApiTest = async () => {
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
            const data = await res.json();
            setApiResult(JSON.stringify(data));
        } catch {
            setApiResult("❌ エラーが発生しました");
        }
    };

    if (process.env.NODE_ENV === "production") {
        return (
            <div className="p-6">
                <h1 className="text-xl font-bold text-red-600">🚫 本番環境ではアクセスできません</h1>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">🛠 Admin Debug Dashboard</h1>

            <section>
                <h2 className="text-lg font-semibold">✅ shadcn/ui ボタンテスト</h2>
                <Button onClick={() => setCount(count + 1)}>クリック: {count}</Button>
            </section>

            <section>
                <h2 className="text-lg font-semibold">✅ Notification API テスト</h2>
                <Button onClick={handleNotify}>通知を送信</Button>
            </section>

            <section>
                <h2 className="text-lg font-semibold">✅ localStorage テスト</h2>
                <Button onClick={handleStorage}>保存する</Button>
                <p>保存された値: {storageValue}</p>
            </section>

            <section>
                <h2 className="text-lg font-semibold">✅ Zustand 状態テスト</h2>
                <Button onClick={increaseZustand}>Zustandカウント: {zustandCount}</Button>
            </section>

            <section>
                <h2 className="text-lg font-semibold">✅ API 通信テスト</h2>
                <Button onClick={handleApiTest}>API 取得</Button>
                <p className="text-sm text-gray-600 break-all">結果: {apiResult}</p>
            </section>
        </div>
    );
}
