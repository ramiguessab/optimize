"use client";
import dynamic from "next/dynamic";
const Conf = dynamic(() => import("react-confetti"), { ssr: false });

export default function Confetti({ running }: { running: boolean }) {
    return <Conf style={{ zIndex: 100 }} run={running} />;
}
