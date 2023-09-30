"use client";
import { useEffect, useState } from "react";
import FirestoreRequest from "@/firebase/firestore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableRow,
    TableHeader,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import type {
    DocumentSnapshot,
    QueryDocumentSnapshot,
} from "firebase/firestore";

import type { RegistrationSchema } from "@/components/register/form";

interface IRegistred extends RegistrationSchema {
    id: string;
    accepted: boolean;
}

const firestoreRequest = new FirestoreRequest("registered");

const Filters = () => {
    return (
        <div className="p-4 flex gap-6">
            <div className="w-full">
                <Label>First Name</Label>
                <Input placeholder="john" />
            </div>
            <div className="w-full">
                <Label>Last Name</Label>
                <Input placeholder="doe" />
            </div>
            <div className="w-full">
                <Label>Age</Label>
                <div className="flex gap-2">
                    <Input placeholder="min" type="number" min={1} />
                    <Input placeholder="min" type="number" min={1} />
                </div>
            </div>
            <div className="w-full">
                <Label>Email</Label>
                <Input placeholder="you@email.com" />
            </div>
            <div className="w-full">
                <Label>Attemped 1st Edition</Label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Yes / No" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={"yes"}>Yes</SelectItem>
                        <SelectItem value={"no"}>No</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="w-full">
                <Label>Response</Label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Accepted / Refused" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={"true"}>Accepted</SelectItem>
                        <SelectItem value={"false"}>Refused</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="w-full">
                <Label>Email Sent</Label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sent / Not Sent" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={"true"}>Sent</SelectItem>
                        <SelectItem value={"false"}>Not Sent</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

const DataTable = () => {
    const [registreds, setRegistred] = useState<IRegistred[]>([]);
    useEffect(() => {
        firestoreRequest.getDoc(firestoreRequest.collection).then((docs) => {
            const registeredTemp: IRegistred[] = [];
            (docs as QueryDocumentSnapshot[])!.forEach((doc) => {
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
                <TableRow className="dark:border-b-neutral-900">
                    <TableHead>first name</TableHead>
                    <TableHead>last name</TableHead>
                    <TableHead>birth year</TableHead>
                    <TableHead>email</TableHead>
                    <TableHead>edition one</TableHead>
                    <TableHead>work</TableHead>
                    <TableHead>tell more</TableHead>
                    <TableHead>accepted</TableHead>
                    <TableHead>email sent</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {registreds.map((registred) => (
                    <TableRow
                        key={registred.id}
                        className="dark:border-b-neutral-900"
                    >
                        <TableCell>{registred.first_name}</TableCell>
                        <TableCell>{registred.last_name}</TableCell>
                        <TableCell>{registred.birth_year}</TableCell>
                        <TableCell className="normal-case">
                            {registred.email}
                        </TableCell>
                        <TableCell>
                            {registred.first_edition ? "✅" : "❌"}
                        </TableCell>

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
                        <TableCell>
                            <Checkbox className="m-2" checked={false} />
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
            <Filters />
            <DataTable />
        </div>
    );
}
