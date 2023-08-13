"use client";
import { useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogFooter,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

interface ICheckIn extends Object {
    id: string;
    first_name: string;
    last_name: string;
    present: boolean;
}

const check_in: ICheckIn = {
    id: "3ByukRGOoBM4FsJPEu22",
    first_name: "rami",
    last_name: "guessab",
    present: false,
};

const ResultDialog = ({
    id,
    setId,
}: {
    id?: string;
    setId: (id: string) => void;
}) => {
    const used = check_in.present;
    const first = check_in.first_name;
    const last = check_in.last_name;
    const found = true;

    return (
        <Dialog defaultOpen>
            <DialogContent className="max-w-sm capitalize">
                <DialogHeader>
                    <DialogTitle>check in result</DialogTitle>
                    <DialogDescription>
                        {used
                            ? "gotcha 👮"
                            : found
                            ? "welcome"
                            : "invalid or not found"}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-4 items-center">
                    <div className="text-9xl">
                        {used ? "⁉️" : found ? "✅" : "❌"}
                    </div>
                    <div className="leading-relaxed">
                        {found ? (
                            <>
                                <h1 className="mx-auto w-fit text-2xl"></h1>

                                <p>
                                    <span className="underline">id:</span>
                                    <span className="text-neutral-700 text-sm">
                                        {" "}
                                        {id}
                                    </span>
                                </p>

                                <p>
                                    <span className="underline">
                                        first name:
                                    </span>
                                    <span className="text-neutral-700">
                                        {" "}
                                        {first}
                                    </span>
                                </p>

                                <p>
                                    <span className="underline">
                                        last name:
                                    </span>
                                    <span className="text-neutral-700">
                                        {" "}
                                        {last}
                                    </span>
                                </p>
                            </>
                        ) : (
                            <h1 className="mx-auto text-3xl">Error</h1>
                        )}
                    </div>
                </div>
                <DialogFooter className="flex">
                    <Button
                        className="w-full"
                        onClick={() => {
                            setId("");
                        }}
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default function CheckIn() {
    const [id, setId] = useState("");

    useEffect(() => {
        const html5QrCode = new Html5Qrcode("qr");

        html5QrCode.start(
            { facingMode: "environment" },
            {
                fps: 30,
                qrbox: { width: 300, height: 300 },
            },
            (text) => {
                setId(text);
            },
            () => {}
        );
    }, []);

    return (
        <div className="h-[calc(100dvh_-_106px)] pt-8">
            {id && <ResultDialog id={id} setId={setId} />}

            <div id="qr" />
        </div>
    );
}
