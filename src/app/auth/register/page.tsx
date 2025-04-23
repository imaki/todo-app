// 📄 src/app/auth/register/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        setError(""); // エラー初期化
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/"); // 登録成功後トップに遷移
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("登録中にエラーが発生しました。");
            }
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-12 space-y-4">
            <h1 className="text-2xl font-bold">Create Account</h1>

            <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full dark:bg-gray-800 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full dark:bg-gray-800 dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button onClick={handleRegister} className="w-full">
                Sign Up
            </Button>
        </div>
    );
}
