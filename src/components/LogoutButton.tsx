"use client";

import { logout } from "@/lib/firebaseLogout";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

export function LogoutButton() {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser); // ← ここ！

    const handleLogout = async () => {
        await logout();
        setUser(null); // ← Zustandの状態をクリア
        router.push("/auth/login");
    };

    return <Button onClick={handleLogout}>Logout</Button>;
}
