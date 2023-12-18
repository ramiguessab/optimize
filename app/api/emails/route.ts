import FirestoreRequest from "@/firebase/firestore";
import { NextResponse, NextRequest } from "next/server";
import QrCode from "qrcode";
import { Resend } from "resend";

const API_KEY = "re_2a5SWiGR_6de25CXUGo97r37wYZhEctPq";

// const resend = new Resend(API_KEY);

interface IEMails {
    email: string;
    id: string;
}

export async function POST(request: NextRequest) {
    const body: { emails: IEMails[] } = await request.json();
    let resend;
    let task;
    const emailTasks = [];

    for (let email of body.emails) {
        // const qrcode = await QrCode.toBuffer(email.id);

        resend = new Resend(API_KEY);
        task = resend.emails.send({
            from: "optimize@casa-gift.shop",
            to: email.email,
            subject: "qrcode test",
            // attachments: [{ content: qrcode }],
            html: `<main>
                
                <p>${email.id}</p>
            <main>`,
        });
        emailTasks.push(task);
    }

    const emails = await Promise.allSettled(emailTasks);
    const updates: Promise<void>[] = [];
    emails.forEach((email, index) => {
        if (email.status === "fulfilled") {
            if (email.value.error === null && email.value.data) {
                updates.push(
                    new FirestoreRequest("registered").updateDoc(
                        body.emails[index].id,
                        {
                            email_sent: true,
                        }
                    )
                );
            }
        }
    });

    await Promise.allSettled(updates);

    return NextResponse.json("hello");
}
