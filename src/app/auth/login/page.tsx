"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState("");
    const [authError, setAuthError] = useState("");
    const router = useRouter();

    const isEmailValid = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = (pw: string) => pw.length >= 6;

    const handleLogin = async () => {
        setFormError("");
        setAuthError("");

        if (!isEmailValid(email)) {
            setFormError("Invalid email format");
            return;
        }

        if (!isPasswordValid(password)) {
            setFormError("Password must be at least 6 characters long");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setAuthError(err.message);
            } else {
                setAuthError("An unexpected error occurred during login");
            }
        }
    };

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                await handleLogin();
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

            {formError && <p className="text-red-500 text-sm">{formError}</p>}
            {authError && <p className="text-red-500 text-sm">{authError}</p>}

            <Button type="submit" disabled={!email || !password}>
                Login
            </Button>
        </form>
    );
}

export default function LoginPage() {
    return (
        <div className="flex justify-center items-center h-screen">
            <LoginForm />
        </div>
    );
}
