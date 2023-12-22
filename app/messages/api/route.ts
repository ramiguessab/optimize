import { NextRequest, NextResponse } from "next/server";
import FirestoreRequest from "@/firebase/firestore";
import { messageSchema } from "@/lib/message";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const isValidBody = messageSchema.safeParse(body);

    if (!isValidBody.success) {
        return NextResponse.json(isValidBody.error);
    }

    await new FirestoreRequest("messages").addDoc(body);

    return NextResponse.json("success");
}
