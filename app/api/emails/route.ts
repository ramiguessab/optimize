import FirestoreRequest, { Storage } from "@/firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import { NextResponse, NextRequest } from "next/server";
import QrCode from "qrcode";
import { Resend } from "resend";
import process from "process";

import OptimizeEMail from "@/components/email/email";

const API_KEY = process.env.RESEND_APIKEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// const resend = new Resend(API_KEY);

interface IEMails {
    email: string;
    id: string;
    workshop: string;
    full_name: string;
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
    let qrcode;
    let url;

    for (let email of body.emails) {
        qrcode = await QrCode.toBuffer(email.id);

        url = await getDownloadURL(
            (
                await new Storage(`qrcodes/${email.id}`).uploadFile(qrcode)
            ).ref
        );

        resend = new Resend(API_KEY);

        task = resend.emails.send({
            from: "secondEdition@optimize-jijel.org",
            to: email.email,
            subject: "Optimize Invitation",
            react: OptimizeEMail({
                accepted: true,
                full_name: email.full_name,
                id: email.id,
                qrCode: url,
                workshop: email.workshop,
            }),
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
