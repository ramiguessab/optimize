import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table } from "@tanstack/react-table";
import { IRegistred } from "./dataTable";

import * as Select from "@/components/ui/select";

export default function Filters({ table }: { table: Table<IRegistred> }) {
    return (
        <div className="p-4 flex gap-6">
            <div className="w-full">
                <Label>First Name</Label>
                <Input
                    placeholder="john"
                    onChange={(event) => {
                        table
                            .getColumn("first_name")
                            ?.setFilterValue(event.currentTarget.value);
                    }}
                />
            </div>
            <div className="w-full">
                <Label>Last Name</Label>
                <Input
                    placeholder="doe"
                    onChange={(event) => {
                        table
                            .getColumn("last_name")
                            ?.setFilterValue(event.currentTarget.value);
                    }}
                />
            </div>

            <div className="w-full">
                <Label>Email</Label>
                <Input
                    placeholder="you@email.com"
                    onChange={(event) => {
                        table
                            .getColumn("email")
                            ?.setFilterValue(event.currentTarget.value);
                    }}
                />
            </div>
            <div className="w-full">
                <Label>Attemped 1st Edition</Label>
                <Select.Select
                    onValueChange={(value: "yes" | "no") => {
                        table
                            .getColumn("first_edition")
                            ?.setFilterValue(value === "yes");
                    }}
                >
                    <Select.SelectTrigger className="w-full">
                        <Select.SelectValue placeholder="Yes / No" />
                    </Select.SelectTrigger>
                    <Select.SelectContent>
                        <Select.SelectItem value={"yes"}>Yes</Select.SelectItem>
                        <Select.SelectItem value={"no"}>No</Select.SelectItem>
                    </Select.SelectContent>
                </Select.Select>
            </div>

            <div className="w-full">
                <Label>Email Sent</Label>
                <Select.Select
                    onValueChange={(value: "sent" | "not sent") => {
                        table
                            .getColumn("accepted")
                            ?.setFilterValue(value === "sent");
                    }}
                >
                    <Select.SelectTrigger className="w-full">
                        <Select.SelectValue placeholder="Sent / Not Sent" />
                    </Select.SelectTrigger>
                    <Select.SelectContent>
                        <Select.SelectItem value={"sent"}>
                            Sent
                        </Select.SelectItem>
                        <Select.SelectItem value={"not sent"}>
                            Not Sent
                        </Select.SelectItem>
                    </Select.SelectContent>
                </Select.Select>
            </div>
        </div>
    );
}
