// 📄 src/store/authStore.ts

import { create } from "zustand";
import { User } from "firebase/auth";

interface AuthState {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,

    // ✅ Firebase の onAuthStateChanged から呼ばれる
    setUser: (user) => {
        set({ user });

        // ✅ 必要ならここで localStorage にも保存できる
        // 例：
        // if (process.env.NODE_ENV === "development") {
        //     localStorage.setItem("devUser", JSON.stringify(user));
        // }
    },
}));
