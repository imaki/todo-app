// 📄 src/lib/firestoreUtils.ts

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

// Firestoreにタスクを追加
export const addTodo = async (uid: string, todo: Omit<Todo, "id">) => {
    try {
        const userTodosRef = collection(db, "users", uid, "todos");
        await addDoc(userTodosRef, todo);
    } catch (error) {
        console.error("Error adding todo:", error);
    }
};

// Firestoreのタスクをリアルタイムで取得
export const subscribeToTodos = (
    uid: string,
    callback: (todos: Todo[]) => void
) => {
    const userTodosRef = collection(db, "users", uid, "todos");
    const q = query(userTodosRef, orderBy("createdAt", "desc"));

    return onSnapshot(q, (snapshot) => {
        const todos: Todo[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Todo[];

        callback(todos);
    });
};

// Firestoreのタスクを更新
export const updateTodo = async (
    uid: string,
    todoId: string,
    data: Partial<Todo>
) => {
    try {
        const todoDocRef = doc(db, "users", uid, "todos", todoId);
        await updateDoc(todoDocRef, data);
    } catch (error) {
        console.error("Error updating todo:", error);
    }
};

// Firestoreのタスクを削除
export const deleteTodo = async (uid: string, todoId: string) => {
    try {
        const todoDocRef = doc(db, "users", uid, "todos", todoId);
        await deleteDoc(todoDocRef);
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
};
