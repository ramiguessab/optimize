"use client";
import { useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Flashlight, FlashlightOff } from "lucide-react";
import {
    Html5QrcodeCameraScanConfig,
    Html5QrcodeConfigs,
} from "html5-qrcode/esm/html5-qrcode";

export default function CheckIn() {
    useEffect(() => {
        const html5QrCode = new Html5Qrcode("qr");
        const qrCodeSuccessCallback = (decodedText: string) => {
            console.log(decodedText);
        };
        const config: Html5QrcodeCameraScanConfig = {
            fps: 30,
            qrbox: { width: 250, height: 250 },
            videoConstraints: { aspectRatio: 4 / 3, facingMode: "environment" },
        };

        // If you want to prefer front camera
        html5QrCode.start({}, config, qrCodeSuccessCallback, () => {});
    }, []);

    return (
        <div>
            <div id="qr"></div>
        </div>
    );
}
