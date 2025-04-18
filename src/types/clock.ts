// src/types/clock.ts

// 🌍 都市の型定義
export type City = {
    name: string;       // 表示用の都市名
    timezone: string;   // date-fns-tz 用のタイムゾーンID
};

// 🌐 都市リスト（セレクトボタンなどで使う）
export const CITY_LIST: City[] = [
    { name: "New York", timezone: "America/New_York" },
    { name: "San Francisco", timezone: "America/Los_Angeles" },
    { name: "London", timezone: "Europe/London" },
    { name: "Berlin", timezone: "Europe/Berlin" },
    { name: "Sydney", timezone: "Australia/Sydney" },
];
