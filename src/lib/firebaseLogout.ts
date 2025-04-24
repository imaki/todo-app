// src/lib/firebaseLogout.ts
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

/**
 * Logs the current user out of Firebase Authentication.
 */
export const logout = async () => {
    try {
        await signOut(auth);
        console.log("Logout successful");
    } catch (error) {
        console.error("Logout failed:", error);
    }
};
