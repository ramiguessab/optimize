import FirestoreRequest from "@/firebase/firestore";
import { NextResponse, NextRequest } from "next/server";
import QrCode from "qrcode";
import { Resend } from "resend";
import process from "process";

const API_KEY = process.env.RESEND_APIKEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// const resend = new Resend(API_KEY);

interface IEMails {
    email: string;
    id: string;
}

export async function POST(request: NextRequest) {
    const password = request.cookies.get("password");
    if (!password || password.value !== ADMIN_PASSWORD) {
        return NextResponse.json("password is invalid or undefined", {
            status: 401,
        });
    }

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
