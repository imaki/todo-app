// tailwind.config.ts
import { type Config } from "tailwindcss"
import animate from "tailwindcss-animate"

const config: Config = {
    darkMode: "class", // ダークモード切替を class ベースで
    content: [
        "./src/**/*.{ts,tsx}", // src内のtsx,tsファイルを対象にする
    ],
    theme: {
        extend: {
            colors: {
                // カスタムカラーがあればここに追加
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)", "sans-serif"],
                mono: ["var(--font-geist-mono)", "monospace"],
            },
        },
    },
    plugins: [animate], // shadcn/uiに必要
}
export default config
