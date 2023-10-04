"use client";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
const Certificate = dynamic(
    () => import("@/components/certificate/certificate"),
    {
        ssr: false,
        loading: () => <Button disabled>Certificate in the making</Button>,
    }
);

export default function CertificatePage() {
    return <Certificate />;
}
