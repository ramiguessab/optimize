import { writeFile } from "fs";
import FirestoreRequest from "@/firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
    new FirestoreRequest("registered").onSnapshot((snap) => {
        const res: any = {};
        snap.docs.forEach((doc) => {
            res[doc.id] = doc.data();
        });
        writeFile("hello.json", JSON.stringify(res), () => {
            console.log(Object.keys(res).length);
        });
    }, "collection");
    return NextResponse.json("success");
}
