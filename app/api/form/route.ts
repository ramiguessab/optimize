import { NextRequest, NextResponse } from "next/server";
import FirestoreRequest from "@/firebase/firestore";
import { formSchema } from "@/lib/form";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const isValidBody = formSchema.safeParse(body);
    if (!isValidBody.success) {
        return NextResponse.json(isValidBody.error);
    }

    await new FirestoreRequest("registered").addDoc({
        ...isValidBody.data,
        accepted: false,
        email_sent: false,
    });
    return NextResponse.json("success");
}
