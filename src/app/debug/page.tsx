// src/app/admin/debug/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminDebugPage() {
    const [count, setCount] = useState(0);
    const [storageValue, setStorageValue] = useState<string | null>(null);

    // localStorage から値を読み込む
    useEffect(() => {
        const saved = localStorage.getItem("debugTest");
        setStorageValue(saved);
    }, []);

    // 通知を送信する関数
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

    // localStorage に保存する関数
    const handleStorage = () => {
        localStorage.setItem("debugTest", "✅ Saved!");
        setStorageValue("✅ Saved!");
    };

    // 環境チェック：実務ではNODE_ENVや認証などで制限する
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
            <p className="text-sm text-gray-500">
                ※ このページは開発者専用です。実務では /admin/debug や /test-env のような非公開ルートを使い、
                チームメンバーが機能を手動で確認できるようにします。
                本番環境では通常アクセスできないよう制限します。
            </p>

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
                <h2 className="text-lg font-semibold">✅ 今後の追加予定</h2>
                <ul className="list-disc list-inside text-gray-600">
                    <li>Zustand の状態テスト</li>
                    <li>世界時計コンポーネント表示</li>
                    <li>API 通信テスト</li>
                </ul>
            </section>
        </div>
    );
}