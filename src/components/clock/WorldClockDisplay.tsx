"use client";

import { useClockStore } from "@/store/clockStore";
import { useEffect, useState } from "react";
import { format, toZonedTime } from "date-fns-tz";

export default function WorldClockDisplay() {
    const cities = useClockStore((state) => state.selectedCities);
    const [now, setNow] = useState(new Date());
    const [mounted, setMounted] = useState(false); // ✅ 追加！

    useEffect(() => {
        setMounted(true); // ✅ 初回マウント確認
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // ✅ サーバーでは何も表示しない（Hydrationズレ防止）
    if (!mounted) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((city) => {
                const zonedDate = toZonedTime(now, city.timezone);
                const timeStr = format(zonedDate, "HH:mm:ss");
                const dateStr = format(zonedDate, "yyyy-MM-dd (EEE)");

                return (
                    <div
                        key={city.timezone}
                        className="border p-4 rounded shadow-sm bg-white"
                    >
                        <div className="text-lg font-semibold">{city.name}</div>
                        <div className="text-3xl font-mono">{timeStr}</div>
                        <div className="text-sm text-gray-500">{dateStr}</div>
                    </div>
                );
            })}
        </div>
    );
}
