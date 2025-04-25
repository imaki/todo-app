// 📄 src/store/todoStore.ts

import { create } from "zustand";
import { Todo } from "@/types/todo";

type TodoStore = {
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    addTodo: (todo: Todo) => void;
    updateTodo: (id: string, data: Partial<Todo>) => void;
    deleteTodo: (id: string) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [],

    setTodos: (todos) => set({ todos }),

    addTodo: (todo) =>
        set((state) => ({
            todos: [todo, ...state.todos],
        })),

    updateTodo: (id, data) =>
        set((state) => ({
            todos: state.todos.map((t) =>
                t.id === id ? { ...t, ...data } : t
            ),
        })),

    deleteTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((t) => t.id !== id),
        })),
}));
