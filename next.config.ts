// next.config.ts
import type { NextConfig } from "next";

// ❗️next-pwa を require で読み込み（型エラーを防ぐ）
const withPWA: any = require("next-pwa")({
    dest: "public",              // Service Worker の出力先
    register: true,              // 自動で SW 登録
    skipWaiting: true,           // 更新時すぐ有効化
    disable: process.env.NODE_ENV === "development", // 開発中は無効
});

const nextConfig: NextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // ❗️experimental機能：型が未定義なのでts-ignoreで回避
    experimental: {
        // @ts-expect-error - serverActionsは型未定義のため明示的に無視
        serverActions: true,
    },
};

// ✅ 最終エクスポート
module.exports = withPWA(nextConfig);
