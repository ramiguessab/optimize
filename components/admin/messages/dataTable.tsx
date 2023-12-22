"use client";
import { useEffect, useState } from "react";
import Firestore from "@/firebase/firestore";
import {
    Row,
    ColumnFiltersState,
    flexRender,
    useReactTable,
    createColumnHelper,
    getSortedRowModel,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    ColumnSort,
} from "@tanstack/react-table";
import { Button } from "../../ui/button";
import * as Table from "@/components/ui/table";

import type { MessageFormSchema } from "@/lib/message";

const columnsHelper = createColumnHelper<MessageFormSchema>();

const columns = [columnsHelper.accessor("message", { header: "Message" })];

export default function AdminDataTable({}: {}) {
    const [data, setData] = useState<MessageFormSchema[]>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    useEffect(() => {
        const unsub = new Firestore("messages").onSnapshot((snap) => {
            const docs = snap.docs;
            const data = docs.map((doc) => doc.data()) as MessageFormSchema[];
            setData(data);
        }, "collection");

        return unsub;
    }, []);
    return (
        <Table.Table>
            <Table.TableHeader>
                {table.getHeaderGroups().map((headGroup) => (
                    <Table.TableRow
                        className="dark:border-b-neutral-900"
                        key={headGroup.id}
                    >
                        {headGroup.headers.map((header) => (
                            <Table.TableHead
                                key={header.id}
                                className="dark:hover:bg-neutral-800 hover:bg-neutral-200 cursor-pointer"
                                onClick={header.column.getToggleSortingHandler()}
                            >
                                <div className="flex justify-between items-center">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </div>
                            </Table.TableHead>
                        ))}
                    </Table.TableRow>
                ))}
            </Table.TableHeader>
            <Table.TableBody>
                {table.getRowModel().rows.map((row) => (
                    <Table.TableRow
                        key={row.id}
                        className="dark:border-b-neutral-900"
                    >
                        {row.getVisibleCells().map((cell) => (
                            <Table.TableCell key={cell.id} className="w-96">
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </Table.TableCell>
                        ))}
                    </Table.TableRow>
                ))}
            </Table.TableBody>
        </Table.Table>
    );
}
