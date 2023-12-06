import AdminDataTable from "@/components/admin/registred/dataTable";
import { IRegistred } from "@/components/admin/registred/dataTable";
import FirestoreRequest from "@/firebase/firestore";
import { QueryDocumentSnapshot } from "firebase/firestore";

export default async function Admin() {
    const firestoreRequest = new FirestoreRequest("registered");
    let docs = (await firestoreRequest.getDoc(
        firestoreRequest.collection
    )) as QueryDocumentSnapshot[];

    const data = docs.map(
        (doc) =>
            ({
                id: doc.id,
                ...doc.data(),
            } as IRegistred)
    );

    return (
        <div className="capitalize">
            <AdminDataTable serverData={data} />
        </div>
    );
}
