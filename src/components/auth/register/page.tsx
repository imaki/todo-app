// ✅ このファイルは: src/app/auth/register/page.tsx

import { RegisterForm } from "@/components/auth/register/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>
            <RegisterForm />
        </div>
    );
}
