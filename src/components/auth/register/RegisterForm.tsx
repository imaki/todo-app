"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        setError("");
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("登録中に予期せぬエラーが発生しました");
            }
        }
    };

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                await handleRegister(); // ✅ await 追加
            }}
            className="space-y-4 max-w-sm mx-auto"
        >
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" disabled={!email || !password}>
                登録
            </Button>
        </form>
    );
}
