"use client";
import { useEffect, useState } from "react";
import Filters from "./filters";
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
import { Input } from "../../ui/input";
import * as Select from "../../ui/select";
import { Button } from "../../ui/button";
import * as Table from "@/components/ui/table";

import { ArrowDownUp, ArrowUp, ArrowDown } from "lucide-react";

import type { RegistrationSchema } from "@/components/register/form";
import FirestoreRequest from "@/firebase/firestore";

export interface IRegistred extends RegistrationSchema {
    selected: boolean;
    id: string;
    accepted: boolean;
    email_sent: boolean;
}

const columnsHelper = createColumnHelper<IRegistred>();

const columns = [
    columnsHelper.accessor("selected", {
        header: ({ table }) => (
            <input
                type="checkbox"
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                }}
            />
        ),
        cell: ({ row }) => (
            <div className="px-1">
                <input
                    type="checkbox"
                    {...{
                        checked: row.getIsSelected(),
                        disabled: !row.getCanSelect(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: row.getToggleSelectedHandler(),
                    }}
                />
            </div>
        ),
    }),
    columnsHelper.accessor("id", { header: "ID" }),
    columnsHelper.accessor("full_name", { header: "Full Name" }),
    columnsHelper.accessor("email", { header: "Email" }),
    columnsHelper.accessor("occupation", { header: "Occupation" }),
    columnsHelper.accessor("tell_something", {
        header: "Something about you?",
    }),
    columnsHelper.accessor("how_did_know", {
        header: "How do you know us?",
    }),
    columnsHelper.accessor("best_part", { header: "Best Part" }),
    columnsHelper.accessor("expectation", { header: "Expectations" }),
    columnsHelper.accessor("lunch", {
        header: "Lunch",
        cell: (props) => {
            return props.getValue() === "yes" ? "✅" : "❌";
        },
    }),
    columnsHelper.accessor("workshop", {
        header: "Workshop",
    }),
    columnsHelper.accessor("why_choose_you", {
        header: "Why you?",
    }),
    columnsHelper.accessor("accepted", {
        header: "Accepted",
        cell: (props) => {
            const accepted = props.getValue();
            return (
                <Button
                    onClick={() => {
                        new FirestoreRequest("registered").updateDoc(
                            props.row.getValue("id"),
                            { accepted: !accepted }
                        );
                    }}
                >
                    {accepted ? "✅" : "❌"}
                </Button>
            );
        },
    }),
    columnsHelper.accessor("email_sent", {
        header: "Email Sent",
        cell: (props) => {
            return props.getValue() ? "✅" : "❌";
        },
    }),
];

const SendEmail = ({ selectedRows }: { selectedRows: Row<IRegistred>[] }) => {
    const [loading, setLoading] = useState(false);
    return (
        <Button
            disabled={selectedRows.length === 0 || loading}
            className="w-full mb-4"
            onClick={async () => {
                setLoading(true);
                const hash: Map<string, boolean> = new Map();
                const emails: {
                    email: string;
                    id: string;
                    workshop: string;
                    full_name: string;
                }[] = [];

                selectedRows.forEach((row) => {
                    if (!hash.has(row.original.email)) {
                        emails.push({
                            email: row.original.email,
                            id: row.original.id,
                            full_name: row.original.full_name,
                            workshop: row.original.workshop,
                        });

                        hash.set(row.original.email, true);
                    }
                });

                const origin = document.location.origin;
                await fetch(`${origin}/api/emails`, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        emails: emails,
                    }),
                });
                setLoading(false);
            }}
        >
            {loading ? "Loading..." : "Send Emails"}
        </Button>
    );
};

export default function AdminDataTable({}: {}) {
    const [data, setData] = useState<IRegistred[]>([]);
    const [sorting, setSorting] = useState<ColumnSort[]>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        state: { sorting, rowSelection, columnFilters },
        enableRowSelection: true,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        // getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });
    // const pageSizes = [10, 20, 30, 50, data.length];
    const selectedRows = table.getSelectedRowModel().rows;
    // const tableState = table.getState();
    useEffect(() => {
        const unsub = new Firestore("registered").onSnapshot((snap) => {
            const docs = snap.docs;
            const data = docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as IRegistred[];
            setData(data);
        }, "collection");

        return unsub;
    }, []);
    return (
        <>
            <Filters table={table} />
            <SendEmail selectedRows={selectedRows} />
            <div className="flex flex-row justify-between items-center p-4">
                <p>
                    {selectedRows.length} of {data.length} selected
                </p>

                {/* <div className="flex flex-row gap-4">
                    <Button
                        onClick={() => {
                            table.previousPage();
                        }}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={() => {
                            table.nextPage();
                        }}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
                <div className="">
                    <Select.Select
                        defaultValue={`${tableState.pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(parseInt(value));
                        }}
                    >
                        <Select.SelectTrigger>
                            <Select.SelectValue>
                                {tableState.pagination.pageSize}
                            </Select.SelectValue>
                        </Select.SelectTrigger>
                        <Select.SelectContent>
                            {pageSizes.map((pageSize, index) => (
                                <Select.SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                >
                                    {pageSize === data.length
                                        ? "All"
                                        : pageSize}
                                </Select.SelectItem>
                            ))}
                        </Select.SelectContent>
                    </Select.Select>
                </div> */}
            </div>

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
                                        {{
                                            asc: <ArrowUp size={16} />,
                                            desc: <ArrowDown size={16} />,
                                        }[
                                            header.column.getIsSorted() as string
                                        ] ?? <ArrowDownUp size={16} />}
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
                                <Table.TableCell key={cell.id}>
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
        </>
    );
}
