import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Memo } from "@/types/memo";

interface MemoStore {
    memos: Memo[];
    addMemo: (memo: Memo) => void;
    deleteMemo: (id: string) => void;
}

export const useMemoStore = create<MemoStore>()(
    persist(
        (set) => ({
            memos: [],
            addMemo: (memo) =>
                set((state) => ({
                    memos: [...state.memos, memo],
                })),
            deleteMemo: (id) =>
                set((state) => ({
                    memos: state.memos.filter((m) => m.id !== id),
                })),
        }),
        {
            name: "memos", // localStorageに保存されるキー名
        }
    )
);
