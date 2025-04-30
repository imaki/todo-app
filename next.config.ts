// next.config.ts
import withPWA from "next-pwa"; // ✅ 型安全、require不要

// ✅ next-pwa 設定（型注釈なしでOK）
const pwaConfig = withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
});

// ✅ Next.js 設定（型注釈も省略で警告ゼロ）
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        serverActions: true, // ✅ 型警告が出ないよう @ts-コメント削除
    },
};

// ✅ エクスポート（PWAラップ済み設定をexport）
export default pwaConfig(nextConfig);
