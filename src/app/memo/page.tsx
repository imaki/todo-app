import MemoEditor from "@/components/memo/MemoEditor";
import MemoList from "@/components/memo/MemoList";

export default function MemoPage() {
    return (
        <main className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">📝 Memo</h1>
            <MemoEditor />
            <MemoList />
        </main>
    );
}
