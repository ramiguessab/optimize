"use client";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHead,
    TableRow,
} from "@/components/ui/table";

import { QuerySnapshot, Unsubscribe } from "firebase/firestore";

interface QuizResult {
    answers: boolean[];
    started: Date;
    finished: Date;
}

const QuizTable = () => {
    const [results, setResults] = useState<QuizResult[]>([]);
    useEffect(() => {
        let unsubscribe: Unsubscribe | undefined;
        import("@/firebase/firestore").then((imp) => {
            const FirestoreRequest = imp.default;
            unsubscribe = new FirestoreRequest("quiz_response").onSnapshot(
                (snap) => {
                    const resultTemp: QuizResult[] = [];
                    (snap as QuerySnapshot).docs.forEach((doc) => {
                        resultTemp.push(doc.data() as QuizResult);
                    });

                    setResults([...resultTemp]);
                },
                "collection"
            );
        });
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    return (
        <Table>
            <TableHeader>
                <TableRow className="dark:border-b-neutral-900">
                    <TableHead>Name</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {results.map((result, index) => (
                    <TableRow key={index} className="dark:border-b-neutral-900">
                        <TableCell>Rami Guessab</TableCell>
                        <TableCell>
                            {result.answers.map((answer) =>
                                answer ? " ✅" : " ❌"
                            )}
                        </TableCell>
                        <TableCell>1:26 minutes </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default function page() {
    return <QuizTable />;
}
