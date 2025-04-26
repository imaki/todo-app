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

// Firestoreにタスクを追加する
export const addTodo = async (uid: string, todo: Omit<Todo, "id">) => {
    try {
        const userTodosRef = collection(db, "users", uid, "todos");
        const docRef = await addDoc(userTodosRef, {
            ...todo,
            createdAt: todo.createdAt || new Date().toISOString(),
            reminderAt: todo.reminderAt ?? null,
            notified: todo.notified ?? false,
        });
        await updateDoc(docRef, { id: docRef.id }); // ドキュメントにidを保存
    } catch (error) {
        console.error("Error adding todo:", error);
    }
};

// Firestoreのタスクをリアルタイムで取得してコールバックに渡す
export const subscribeToTodos = (uid: string, callback: (todos: Todo[]) => void) => {
    const userTodosRef = collection(db, "users", uid, "todos");
    const q = query(userTodosRef, orderBy("createdAt", "desc"));

    return onSnapshot(q, (snapshot) => {
        console.log("Firestoreから取得: ", snapshot.docs.length, "件");
        const todos: Todo[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Todo, "id">),
        }));

        console.table(todos); // データ内容も確認できるように表形式で出力

        callback(todos);
    });
};

// Firestoreのタスクを更新する
export const updateTodo = async (uid: string, todoId: string, data: Partial<Todo>) => {
    try {
        const todoDocRef = doc(db, "users", uid, "todos", todoId);
        await updateDoc(todoDocRef, data);
    } catch (error) {
        console.error("Error updating todo:", error);
    }
};

// Firestoreのタスクを削除する
export const deleteTodo = async (uid: string, todoId: string) => {
    try {
        const todoDocRef = doc(db, "users", uid, "todos", todoId);
        await deleteDoc(todoDocRef);
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
};
