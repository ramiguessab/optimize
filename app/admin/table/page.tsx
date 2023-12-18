import AdminDataTable from "@/components/admin/registred/dataTable";
import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";

export default async function Admin() {
    const password = cookies().get("password")?.value;

    if (password !== "87691") {
        permanentRedirect("/admin/");
    }
    return (
        <div className="capitalize">
            <AdminDataTable />
        </div>
    );
}
