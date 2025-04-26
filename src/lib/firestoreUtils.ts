// ✅ src/lib/firestoreUtils.ts（完全修正版）

import { db } from "@/lib/firebase";
import {
    collection,
    addDoc,
    onSnapshot,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
} from "firebase/firestore";

import { Todo } from "@/types/todo";

export const addTodo = async (uid: string, todo: Omit<Todo, "id">) => {
    try {
        const userTodosRef = collection(db, "users", uid, "todos");
        const docRef = await addDoc(userTodosRef, {
            ...todo,
            createdAt: todo.createdAt || new Date().toISOString(),
            reminderAt: todo.reminderAt ?? null,
            notified: todo.notified ?? false,
        });
        await updateDoc(docRef, { id: docRef.id }); // ✅ これが超重要！！！
    } catch (error) {
        console.error("Error adding todo:", error);
    }
};

export const subscribeToTodos = (uid: string, callback: (todos: Todo[]) => void) => {
    const userTodosRef = collection(db, "users", uid, "todos");
    const q = query(userTodosRef, orderBy("createdAt", "desc"));

    return onSnapshot(q, (snapshot) => {
        const todos: Todo[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Todo, "id">),
        }));
        callback(todos);
    });
};

export const updateTodo = async (uid: string, todoId: string, data: Partial<Todo>) => {
    try {
        const todoDocRef = doc(db, "users", uid, "todos", todoId);
        await updateDoc(todoDocRef, data);
    } catch (error) {
        console.error("Error updating todo:", error);
    }
};

export const deleteTodo = async (uid: string, todoId: string) => {
    try {
        const todoDocRef = doc(db, "users", uid, "todos", todoId);
        await deleteDoc(todoDocRef);
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
};
