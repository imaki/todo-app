"use client";

import { useClockStore } from "@/store/clockStore";
import { useEffect, useState } from "react";
import { format, utcToZonedTime } from "date-fns-tz";

export default function WorldClockDisplay() {
    const cities = useClockStore((state) => state.selectedCities);
    const [now, setNow] = useState(new Date());

    // ⏰ 1秒ごとに現在時刻を更新
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(timer); // クリーンアップ
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((city) => {
                const zonedDate = utcToZonedTime(now, city.timezone);
                const timeStr = format(zonedDate, "HH:mm:ss");

                return (
                    <div
                        key={city.timezone}
                        className="border p-4 rounded shadow-sm bg-white"
                    >
                        <div className="text-lg font-semibold">{city.name}</div>
                        <div className="text-3xl font-mono">{timeStr}</div>
                    </div>
                );
            })}
        </div>
    );
}
