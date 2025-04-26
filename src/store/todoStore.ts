// ================================
// 2. 📄 src/store/todoStore.ts
// ================================
import { create } from "zustand";
import { Todo } from "@/types/todo";

type TodoStore = {
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    setTodos: (todos) => set({ todos }),
}));