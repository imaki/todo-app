// 📄 /src/app/auth/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation/schema";
import { z } from "zod";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const [firebaseError, setFirebaseError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const googleProvider = new GoogleAuthProvider();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    // Emailログイン処理（バリデーション通過後）
    const onSubmit = async (data: LoginForm) => {
        setFirebaseError("");
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            router.push("/");
        } catch (err: any) {
            setFirebaseError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Googleログイン処理
    const handleGoogleLogin = async () => {
        setFirebaseError("");
        try {
            await signInWithPopup(auth, googleProvider);
            router.push("/");
        } catch (err: any) {
            setFirebaseError(err.message);
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-20 p-6 border rounded bg-white dark:bg-gray-900 dark:text-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div className="relative">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-8 text-sm text-gray-500"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                {firebaseError && (
                    <p className="text-red-500 text-sm mt-1">{firebaseError}</p>
                )}

                <Button
                    type="submit"
                    disabled={loading || !isValid}
                    className="w-full"
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>

                <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    variant="outline"
                    className="w-full"
                >
                    Login with Google
                </Button>
            </form>
        </div>
    );
}
