import { db } from "./app";

import {
    CollectionReference,
    DocumentData,
    DocumentSnapshot,
    Query,
    QueryDocumentSnapshot,
    QuerySnapshot,
    where,
    doc,
    collection,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    documentId,
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

    async addDoc<T extends Object>(data: T) {
        return await addDoc(this.collection, data);
    }

    async getDoc(
        query: string | Query | CollectionReference
    ): Promise<DocumentSnapshot | QueryDocumentSnapshot[]> {
        if (typeof query === "string") {
            return await getDoc(this.docRef(query as string));
        } else {
            return (await getDocs(query)).docs;
        }
    }

    onSnapshot(
        onSnap: (snapshot: QuerySnapshot<DocumentData, DocumentData>) => void,
        on: "collection" | "document" | "query",
        id?: string
    ) {
        return onSnapshot(this.collection, onSnap);
    }

    async updateDoc(id: string, data: any) {
        return await updateDoc(this.docRef(id), data);
    }

    async deleteDoc(id: string) {
        return await deleteDoc(this.docRef(id));
    }
}
