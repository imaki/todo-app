// 📄 src/components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils"; // クラス名結合関数（なければ空関数にしてOK）

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={cn(
                    "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
