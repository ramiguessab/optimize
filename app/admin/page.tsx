"use client";
import { useEffect, useState } from "react";
import FirestoreRequest from "@/firebase/firestore";

import {
    Table,
    TableRow,
    TableHeader,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import type { DocumentSnapshot } from "firebase/firestore";
import { Checkbox } from "@/components/ui/checkbox";
import type { RegistrationSchema } from "@/components/register/form";

interface IRegistred extends RegistrationSchema {
    id: string;
    accepted: boolean;
}

const firestoreRequest = new FirestoreRequest("registered");

const DataTable = () => {
    const [registreds, setRegistred] = useState<IRegistred[]>([]);
    useEffect(() => {
        firestoreRequest.getDoc(firestoreRequest.collection).then((docs) => {
            const registeredTemp: IRegistred[] = [];
            docs!.forEach((doc: DocumentSnapshot<IRegistred>) => {
                registeredTemp.push({
                    id: doc.id,
                    ...doc.data(),
                } as IRegistred);
            });
            setRegistred(registeredTemp);
        });
    }, []);
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
                    <TableHead>accepted</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {registreds.map((registred) => (
                    <TableRow key={registred.id}>
                        <TableCell>{registred.first_name}</TableCell>
                        <TableCell>{registred.last_name}</TableCell>
                        <TableCell>{registred.email}</TableCell>
                        <TableCell>
                            {registred.first_edition ? "✅" : "❌"}
                        </TableCell>
                        <TableCell>{registred.birth_year}</TableCell>
                        <TableCell>{registred.work}</TableCell>
                        <TableCell className="w-1/3">
                            {registred.more}
                        </TableCell>
                        <TableCell>
                            <Checkbox
                                className="m-2"
                                checked={registred.accepted}
                            />
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
