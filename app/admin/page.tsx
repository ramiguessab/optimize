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
        <>
            <Input
                onChange={(event) => {
                    setPassword(event.currentTarget.value);
                }}
            />
            <Button
                disabled={disabled}
                onClick={() => {
                    document.cookie = `password=${password};`;
                    router.replace("/admin/table");
                }}
            >
                {!disabled ? "Login" : "Enter your Password"}
            </Button>
        </>
    );
}
