import React from "react";
import {
    Table,
    TableRow,
    TableHeader,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

interface IRegistred {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    edition_one: boolean;
    birth_year: string;
    work: string;
    tell_more: string;
}

const registreds: IRegistred[] = [
    {
        id: "Y6XzromtNxj8klD",
        first_name: "Andre",
        last_name: "Williams",
        email: "zuhaufe@tunof.pw",
        edition_one: false,
        birth_year: "2/24/2106",
        work: "student",
        tell_more:
            "yesterday pair taught finest sell father thick active building pull sink report golden modern coal accurate such chest further either rhyme seven author bottom",
    },
    {
        id: "W6guTk3o8hZ9",
        first_name: "Tom",
        last_name: "Wheeler",
        email: "co@je.lv",
        edition_one: true,
        birth_year: "7/30/2079",
        work: "lawyer",
        tell_more:
            "canal motion plastic tail put especially ball dear hunt unit camera laid variety birthday rich silk purple reason softly gently signal real explore rubber",
    },
    {
        id: "c39mhMtBeNW",
        first_name: "Jennie",
        last_name: "King",
        email: "rob@domepu.gy",
        edition_one: true,
        birth_year: "1/30/2025",
        work: "doctor",
        tell_more:
            "numeral pattern wise negative tears rock action lips smaller wolf season repeat learn private record supply fill came my dug thank trade jungle proud",
    },
];

const DataTable = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>first name</TableHead>
                    <TableHead>last name</TableHead>
                    <TableHead>email</TableHead>
                    <TableHead>edition one</TableHead>
                    <TableHead>birth year</TableHead>
                    <TableHead>work</TableHead>
                    <TableHead>tell more</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {registreds.map((registred) => (
                    <TableRow key={registred.id}>
                        <TableCell>{registred.first_name}</TableCell>
                        <TableCell>{registred.last_name}</TableCell>
                        <TableCell>{registred.email}</TableCell>
                        <TableCell>
                            {registred.edition_one ? "✅" : "❌"}
                        </TableCell>
                        <TableCell>{registred.birth_year}</TableCell>
                        <TableCell>{registred.work}</TableCell>
                        <TableCell className="w-1/3">
                            {registred.tell_more}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default function Admin() {
    return (
        <div className="capitalize">
            <DataTable />
        </div>
    );
}
