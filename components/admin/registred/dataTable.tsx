"use client";
import { useEffect, useState } from "react";
import Filters from "./filters";
import {
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

export interface IRegistred extends RegistrationSchema {
    selected: boolean;
    id: string;
    accepted: boolean;
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
    columnsHelper.accessor("first_name", { header: "First Name" }),
    columnsHelper.accessor("last_name", { header: "Last Name" }),
    columnsHelper.accessor("birth_year", { header: "Birth Year" }),
    columnsHelper.accessor("email", { header: "Email" }),
    columnsHelper.accessor("first_edition", {
        header: "Edition One",

        cell: (props) => {
            return props.getValue() ? "✅" : "❌";
        },
    }),
    columnsHelper.accessor("work", { header: "Work" }),
    columnsHelper.accessor("more", { header: "tell More" }),
    columnsHelper.accessor("accepted", {
        header: "Accepted",
        cell: (props) => {
            return props.getValue() ? "✅" : "❌";
        },
    }),
];

export default function AdminDataTable({
    serverData,
}: {
    serverData: IRegistred[];
}) {
    const [data, setData] = useState(serverData);
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
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });
    const pageSizes = [10, 20, 30, 50, data.length];
    const selectedRows = table.getSelectedRowModel().rows;
    const tableState = table.getState();

    return (
        <>
            <Filters table={table} />
            <Button
                disabled={selectedRows.length === 0}
                className="w-full mb-4"
                onClick={() => {
                    const emails = new Set();

                    selectedRows.forEach((row) => {
                        emails.add(row.original.email);
                    });
                    console.log(emails);
                }}
            >
                Send Emails
            </Button>
            <Table.Table>
                <Table.TableCaption>
                    <div className="flex flex-row justify-between p-4">
                        <p>
                            {selectedRows.length} of {data.length} selected
                        </p>

                        <div className="flex flex-row gap-4">
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
                        </div>
                    </div>
                </Table.TableCaption>
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
