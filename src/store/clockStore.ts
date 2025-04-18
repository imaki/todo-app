// src/store/clockStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { City } from "@/types/clock";

const DEFAULT_CITIES: City[] = [
    { name: "New York", timezone: "America/New_York" },
    { name: "London", timezone: "Europe/London" },
    { name: "Sydney", timezone: "Australia/Sydney" },
];

interface ClockStore {
    selectedCities: City[];
    addCity: (city: City) => void;
    removeCity: (timezone: string) => void;
}

export const useClockStore = create<ClockStore>()(
    persist(
        (set, get) => ({
            selectedCities: DEFAULT_CITIES,

            addCity: (city: City): void => {
                const current = get().selectedCities;
                if (
                    current.find((c) => c.timezone === city.timezone) ||
                    current.length >= 3
                ) return;
                set({ selectedCities: [...current, city] });
            },

            removeCity: (timezone: string): void => {
                const filtered = get().selectedCities.filter(
                    (c) => c.timezone !== timezone
                );
                set({ selectedCities: filtered });
            },
        }),
        {
            name: "selected-cities",
        }
    )
);
