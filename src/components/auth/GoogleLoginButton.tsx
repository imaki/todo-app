//components/auth/GoogleLoginButton
"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function GoogleLoginButton() {
    const router = useRouter();

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            router.push("/"); // ログイン成功後にトップへ
        } catch (error) {
            console.error("Googleログイン失敗", error);
        }
    };

    return (
        <Button onClick={handleGoogleLogin} variant="outline">
            Sign in with Google
        </Button>
    );
}
