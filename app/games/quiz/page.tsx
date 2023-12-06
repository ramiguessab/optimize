import Quiz from "@/components/quiz/quiz";

export interface Question {
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

export default async function Page() {
    return <Quiz questions={questions} />;
}
