// 📄 /src/app/auth/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const handleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/"); // Redirect to top page after successful login
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
                console.error(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-20 p-6 border rounded bg-white dark:bg-gray-900 dark:text-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

            <div className="mb-4">
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3"
                />

                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 text-sm text-gray-500"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <Button
                onClick={handleLogin}
                disabled={loading || !email || !password}
                className="w-full"
            >
                {loading ? "Signing in..." : "Sign In"}
            </Button>
        </div>
    );
}
