"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import FirestoreRequest from "@/firebase/firestore";

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
    {
        question: "what did you do today",
        choises: ["eat", "studied"],
        response: "studied",
    },
];

const Separator = () => {
    return <div className="border border-dashed border-neutral-300" />;
};

const Choises = ({
    error,
    choises,
    checked,
    setChecked,
}: {
    error: boolean;
    choises: string[];
    checked: string;
    setChecked: Dispatch<SetStateAction<string>>;
}) => {
    return (
        <div className="flex flex-col gap-4 ">
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
                    className={`flex items-center border-2 border-neutral-400 ${
                        error && "border-red-400 text-red-600"
                    } hover:border-neutral-600 hover:cursor-pointer rounded-2xl p-3 justify-between capitalize`}
                >
                    {choise}

                    <Checkbox
                        id={`a${index}`}
                        checked={checked === choise}
                        className="rounded border-neutral-400"
                    />
                </div>
            ))}
        </div>
    );
};

const Submition = ({
    choises,
    response,
    setAnswers,
}: {
    choises: string[];
    response: string;
    setAnswers: Dispatch<SetStateAction<boolean[]>>;
}) => {
    const [checked, setChecked] = useState("");
    const [error, setError] = useState(false);
    return (
        <div className="flex flex-col gap-4">
            {error && <p className="text-red-500">Chose an answer</p>}
            <Separator />

            <div className="flex flex-col gap-8">
                <Choises
                    error={error}
                    choises={choises}
                    setChecked={setChecked}
                    checked={checked}
                />
                <Button
                    className="bg-yellow-500 hover:bg-yellow-600 dark:text-white dark:bg-yellow-600 hover:dark:bg-yellow-700"
                    onClick={() => {
                        if (checked) {
                            setAnswers((prev) => [
                                ...prev,
                                checked === response,
                            ]);
                            setChecked("");
                            setError(false);
                        } else {
                            setError(true);
                        }
                    }}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default function Quiz() {
    const [answers, setAnswers] = useState<boolean[]>([]);
    const questionNum = answers.length;

    const question = questions[questionNum];

    useEffect(() => {
        if (answers.length === questions.length) {
            new FirestoreRequest("quiz_response").addDoc({
                answers,
                started: new Date(),
                finished: new Date(),
            });
        }
    }, [answers]);

    return (
        <>
            {answers.length !== questions.length ? (
                <div className="h-[calc(100dvh_-_106px)] max-w-screen-lg mx-auto p-8">
                    <span>
                        <span className="text-3xl">
                            Question {questionNum + 1}
                        </span>
                        /{questions.length}
                    </span>
                    <Separator />
                    <motion.div
                        key={questionNum}
                        className="flex flex-col justify-between pb-8 pt-4 h-full "
                        animate={{ x: "0", opacity: 1 }}
                        initial={{ x: "100vw", opacity: 0 }}
                    >
                        <h1 className="text-2xl leading-normal capitalize">
                            {question.question}?
                        </h1>
                        <Submition
                            choises={question.choises}
                            setAnswers={setAnswers}
                            response={question.response}
                        />
                    </motion.div>
                </div>
            ) : (
                "congrats"
            )}
        </>
    );
}
