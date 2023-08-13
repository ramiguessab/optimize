import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHead,
    TableRow,
} from "@/components/ui/table";

interface QuizResult {
    correct: number;
}

const QuizTable = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Rami Guessab</TableCell>
                    <TableCell>{[...Array(10)].map(() => "✅ ")}</TableCell>
                    <TableCell>1:26 minutes </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default function page() {
    return <QuizTable />;
}
