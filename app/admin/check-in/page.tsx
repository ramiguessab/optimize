"use client";
import { useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Flashlight, FlashlightOff } from "lucide-react";

export default function CheckIn() {
    useEffect(() => {
        const html5QrCode = new Html5Qrcode("qr");

        html5QrCode.start(
            { facingMode: "environment" },
            {
                fps: 30,
                qrbox: { width: 300, height: 300 },
            },
            (text) => {
                console.log(text);
            },
            () => {}
        );
    }, []);

    return (
        <div className="h-[calc(100dvh_-_106px)] flex flex-col justify-center items-center">
            <div id="qr" />
        </div>
    );
}
