import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table } from "@tanstack/react-table";
import { IRegistred } from "./dataTable";
import { workshops } from "@/lib/form";
import * as Select from "@/components/ui/select";

export default function Filters({ table }: { table: Table<IRegistred> }) {
    return (
        <div className="p-4 flex gap-6">
            <div className="w-full">
                <Label>Select Rows</Label>
                <Input
                    type="number"
                    min={0}
                    placeholder="0"
                    onChange={(event) => {
                        const numberOfRows = parseInt(
                            event.currentTarget.value
                        );
                        const rows = table.getRowModel().rows;

                        const toSelect = rows.slice(0, numberOfRows);
                        const toDeselect = rows.slice(
                            numberOfRows,
                            rows.length
                        );

                        for (let row of toDeselect) {
                            if (row.getIsSelected()) {
                                row.toggleSelected();
                            }
                        }

                        for (let row of toSelect) {
                            {
                                if (!row.getIsSelected()) {
                                    row.toggleSelected();
                                }
                            }
                        }
                    }}
                />
            </div>

            <div className="w-full">
                <Label>Full Name</Label>
                <Input
                    placeholder="john"
                    onChange={(event) => {
                        table
                            .getColumn("full_name")
                            ?.setFilterValue(event.currentTarget.value);
                    }}
                />
            </div>

            <div className="w-full">
                <Label>Email</Label>
                <Input
                    placeholder="doe"
                    onChange={(event) => {
                        table
                            .getColumn("email")
                            ?.setFilterValue(event.currentTarget.value);
                    }}
                />
            </div>

            <div className="w-full">
                <Label>Lunch</Label>
                <Select.Select
                    onValueChange={(value) => {
                        table.getColumn("lunch")?.setFilterValue(value);
                    }}
                >
                    <Select.SelectTrigger className="w-full">
                        <Select.SelectValue placeholder="Yes / No" />
                    </Select.SelectTrigger>
                    <Select.SelectContent>
                        <Select.SelectItem value={""}>All</Select.SelectItem>
                        <Select.SelectItem value={"yes"}>Yes</Select.SelectItem>
                        <Select.SelectItem value={"no"}>No</Select.SelectItem>
                    </Select.SelectContent>
                </Select.Select>
            </div>

            <div className="w-full">
                <Label>Workshop</Label>
                <Select.Select
                    onValueChange={(value) => {
                        table.getColumn("workshop")?.setFilterValue(value);
                    }}
                >
                    <Select.SelectTrigger className="w-full">
                        <Select.SelectValue placeholder="All" />
                    </Select.SelectTrigger>
                    <Select.SelectContent>
                        <Select.SelectItem value={""}>All</Select.SelectItem>
                        {workshops.map((workshop) => (
                            <Select.SelectItem value={workshop} key={workshop}>
                                {workshop}
                            </Select.SelectItem>
                        ))}
                    </Select.SelectContent>
                </Select.Select>
            </div>

            <div className="w-full">
                <Label>Accepted</Label>
                <Select.Select
                    onValueChange={(value) => {
                        table
                            .getColumn("accepted")
                            ?.setFilterValue(value === "yes");
                    }}
                >
                    <Select.SelectTrigger className="w-full">
                        <Select.SelectValue placeholder="Yes / No" />
                    </Select.SelectTrigger>
                    <Select.SelectContent>
                        <Select.SelectItem value={""}>All</Select.SelectItem>
                        <Select.SelectItem value={"yes"}>Yes</Select.SelectItem>
                        <Select.SelectItem value={"no"}>No</Select.SelectItem>
                    </Select.SelectContent>
                </Select.Select>
            </div>

            <div className="w-full">
                <Label>Email Sent</Label>
                <Select.Select
                    onValueChange={(value) => {
                        table
                            .getColumn("email_sent")
                            ?.setFilterValue(value === "yes");
                    }}
                >
                    <Select.SelectTrigger className="w-full">
                        <Select.SelectValue placeholder="Yes / No" />
                    </Select.SelectTrigger>
                    <Select.SelectContent>
                        <Select.SelectItem value={""}>All</Select.SelectItem>
                        <Select.SelectItem value={"yes"}>Yes</Select.SelectItem>
                        <Select.SelectItem value={"no"}>No</Select.SelectItem>
                    </Select.SelectContent>
                </Select.Select>
            </div>
        </div>
    );
}
