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
    accepted: boolean;
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
            from: "second_edition@optimize-jijel.org",
            to: email.email,
            subject: `Your Exclusive Invitation to Optimize Jijel Second Edition 🚀 - "Exploring AI: The New Frontiers of science" 🌐`,
            react: OptimizeEMail({
                accepted: email.accepted,
                full_name: email.full_name,
                id: email.id,
                qrCode: url,
                workshop: email.workshop,
            }),
        });
        await new FirestoreRequest("registered").updateDoc(email.id, {
            email_sent: true,
        });
    }

    return NextResponse.json("hello");
}
