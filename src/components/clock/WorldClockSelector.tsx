"use client";

import { useClockStore } from "@/store/clockStore";
import { CITY_LIST } from "@/types/clock";
import { Button } from "@/components/ui/button";

export default function WorldClockSelector() {
    const selected = useClockStore((state) => state.selectedCities);
    const addCity = useClockStore((state) => state.addCity);
    const removeCity = useClockStore((state) => state.removeCity);

    return (
        <div className="space-y-2">
            <div className="space-x-2">
                {CITY_LIST.map((city) => (
                    <Button
                        key={city.timezone}
                        variant={
                            selected.some((c) => c.timezone === city.timezone)
                                ? "default"
                                : "outline"
                        }
                        onClick={() =>
                            selected.some((c) => c.timezone === city.timezone)
                                ? removeCity(city.timezone)
                                : addCity(city)
                        }
                    >
                        {city.name}
                    </Button>
                ))}
            </div>
            <p className="text-sm text-gray-500">
                最大3都市まで選択できます（もう一度押すと解除）。
            </p>
        </div>
    );
}
