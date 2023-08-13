"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

interface Question {
    question: string;
    choises: string[];
    response: string;
}

const questions: Question[] = [
    {
        question: "How Are you",
        choises: ["good", "so so", "bad"],
        response: "good",
    },
    {
        question: "what did you do today",
        choises: ["eat", "studied"],
        response: "studied",
    },
];

const Choises = ({ choises }: { choises: string[] }) => {
    const [checked, setChecked] = useState("");

    return (
        <div className="flex flex-col gap-4">
            {choises.map((choise, index) => (
                <div
                    key={index}
                    onClick={() => {
                        if (checked === choise) {
                            setChecked("");
                        } else {
                            setChecked(choise);
                        }
                    }}
                    className="flex items-center border-2 border-neutral-400 hover:border-neutral-900 hover:cursor-pointer rounded-2xl p-3 justify-between capitalize"
                >
                    {choise}

                    <Checkbox
                        id={`a${index}`}
                        checked={checked === choise}
                        className=" rounded border-neutral-400"
                    />
                </div>
            ))}
        </div>
    );
};

export default function Quiz() {
    const [questionNum, setQuestionNum] = useState(0);

    const question = questions[questionNum];

    return (
        <div className="h-[calc(100dvh_-_106px)] max-w-screen-lg mx-auto p-8">
            <span>
                <span className="text-3xl">Question {questionNum + 1}</span>/
                {questions.length}
            </span>
            <div className="border border-dashed border-neutral-300" />
            <div className="flex flex-col justify-between pb-8 pt-4 h-full">
                <h1 className="text-2xl leading-normal capitalize">
                    {question.question}?
                </h1>

                <div className="flex flex-col gap-8">
                    <Choises choises={question.choises} />
                    <Button
                        className="hover:bg-neutral-900"
                        onClick={() => {
                            setQuestionNum((prev) => prev + 1);
                        }}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
