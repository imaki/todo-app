// 📄 src/components/ClientWrapper.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function ClientWrapper({ children }: { children: ReactNode }) {
    const setUser = useAuthStore((state) => state.setUser);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // 実ユーザーを設定
                setUser(user);
            } else {
                if (process.env.NODE_ENV === "development") {
                    // 開発中は仮ログインを通す（型指定あり）
                    const devUser = {
                        uid: "dev-user-id",
                        email: "dev@example.com",
                    } as User;
                    setUser(devUser);
                } else {
                    //  本番環境ではログイン画面へリダイレクト
                    router.push("/auth/login");
                }
            }
        });

        return () => unsubscribe();
    }, [setUser, router]);

    return <>{children}</>;
}
