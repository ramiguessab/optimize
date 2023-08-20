import { db } from "./app";
import {
    CollectionReference,
    DocumentData,
    DocumentSnapshot,
    Query,
    QueryDocumentSnapshot,
    QuerySnapshot,
} from "firebase/firestore";
import {
    doc,
    collection,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    onSnapshot,
} from "firebase/firestore";

//create AddDoc
//retrive getDoc/getDocs
//update updateDoc
//delete deleteDoc

export default class FirestoreRequest {
    collection: CollectionReference<DocumentData, DocumentData>;

    constructor(collection_name: string) {
        this.collection = collection(db, collection_name);
    }

    private docRef(id: string) {
        if (id) {
            return doc(this.collection, id);
        } else {
            throw new Error("specify document id");
        }
    }

    async addDoc(data: any) {
        return await addDoc(this.collection, data);
    }

    async getDoc(query: string | Query | CollectionReference) {
        if (typeof query === "string") {
            return (await getDoc(this.docRef(query as string))).data();
        } else {
            return (await getDocs(query)).docs;
        }
    }

    onSnapshot(
        onSnap: (snapshot: QuerySnapshot | DocumentSnapshot) => void,
        on: "collection" | "document" | "query",
        id?: string
    ) {
        if (on === "document") {
            return onSnapshot(this.docRef(id!), onSnap);
        } else if (on === "collection") {
            return onSnapshot(this.collection, onSnap);
        }
    }

    async updateDoc(id: string, data: any) {
        return await updateDoc(this.docRef(id), data);
    }

    async deleteDoc(id: string) {
        return await deleteDoc(this.docRef(id));
    }
}
