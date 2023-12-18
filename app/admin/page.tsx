import AdminDataTable from "@/components/admin/registred/dataTable";
import { IRegistred } from "@/components/admin/registred/dataTable";
import FirestoreRequest from "@/firebase/firestore";
import { QueryDocumentSnapshot } from "firebase/firestore";

export default async function Admin() {
    return (
        <div className="capitalize">
            <AdminDataTable />
        </div>
    );
}
