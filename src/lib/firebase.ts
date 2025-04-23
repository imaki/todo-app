// 📄 src/lib/firebase.ts

// Firebase SDK のインポート
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ 環境変数を使って設定（.env.local から）
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// ✅ 初期化（すでに初期化済みならそれを再利用）
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ 認証・データベースのインスタンスを取得
export const auth = getAuth(app);
export const db = getFirestore(app);
