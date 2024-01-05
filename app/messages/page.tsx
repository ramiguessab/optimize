import React from "react";
import MessagesForm from "@/components/messages/form";

export default function MessagesPage() {
    return (
        <main className="flex flex-col gap-8 max-w-screen-lg mx-auto p-8">
            <h1 className="text-center font-bold text-5xl leading-tight underline decoration-4 decoration-yellow-200">
                Anonymous Message
            </h1>
            <p>
                Hello Optimizers 👋,your presence in our 2nd edition was truly
                special. We&apos;ve crafted this anonymous message to gather
                your thoughts or feedback, so feel free to share down below 👇.
                Your insights matter, and we&apos;re here, ready to listen and
                consider every perspective. Thank you for being a part of it! ✨
            </p>
            <MessagesForm />
        </main>
    );
}
