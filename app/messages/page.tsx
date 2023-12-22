import React from "react";
import MessagesForm from "@/components/messages/form";

export default function MessagesPage() {
    return (
        <main className="flex flex-col gap-8 max-w-screen-lg mx-auto p-8">
            <h1 className="text-center font-bold text-5xl leading-tight underline decoration-4 decoration-yellow-200">
                Anonymous Message
            </h1>
            <p>
                Hello again! It was an honor to meet you, and finally, I just
                don&apos;t want to go suddenly with no ending. So, I just want
                to say that if you have any suggestions, ideas, critiques, good
                memories, etc., it would be good to just say it and let us know.
                We will take care of it, and don&apos;t worry, as you can see,
                the message is anonymous 😉. See you soon, or should I say in
                the 3rd edition 😂!
            </p>
            <MessagesForm />
        </main>
    );
}
