"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cookies } from "next/headers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const disabled = password === "";
    return (
        <div className="flex flex-col items-center gap-6 p-4">
            <p>Entre your admin password</p>
            <Input
                onChange={(event) => {
                    setPassword(event.currentTarget.value);
                }}
            />
            <Button
                disabled={disabled}
                onClick={() => {
                    document.cookie = `password=${password};`;
                    router.replace("/admin/panel/table");
                }}
            >
                {!disabled ? "Login" : "Enter your Password"}
            </Button>
        </div>
    );
}
