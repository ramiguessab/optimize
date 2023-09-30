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
import FirestoreRequest from "@/firebase/firestore";
import { DocumentSnapshot } from "firebase/firestore";

interface ICheckIn extends Object {
    id: string;
    first_name: string;
    last_name: string;
    present: boolean;
}

interface DialogResult {
    used: boolean;
    found: boolean;
    first_name: string;
    last_name: string;
}

const ResultDialog = ({
    id,
    setId,
}: {
    id?: string;
    setId: (id: string) => void;
}) => {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<DialogResult>({
        used: false,
        first_name: "",
        last_name: "",
        found: false,
    });

    useEffect(() => {
        new FirestoreRequest("registered")
            .getDoc("MWseEFANrItOl6aqTPq0")
            .then((doc) => {
                const check_in = doc as DocumentSnapshot;
                const data = check_in.data() as ICheckIn;
                const used = data.present;
                const first_name = data.first_name;
                const last_name = data.last_name;
                const found = true;
                setResult({ used, first_name, last_name, found });
                setLoading(false);
            });
    }, []);

    if (loading) {
        return null;
    }

    return (
        <Dialog defaultOpen>
            <DialogContent className="max-w-sm capitalize">
                <DialogHeader>
                    <DialogTitle>check in result</DialogTitle>
                    <DialogDescription>
                        {result.used
                            ? "gotcha 👮"
                            : result!.found
                            ? "welcome"
                            : "invalid or not found"}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-4 items-center">
                    <div className="text-9xl">
                        {result.used ? "⁉️" : result.found ? "✅" : "❌"}
                    </div>
                    <div className="leading-relaxed">
                        {result.found ? (
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
                                        {result.first_name}
                                    </span>
                                </p>

                                <p>
                                    <span className="underline">
                                        last name:
                                    </span>
                                    <span className="text-neutral-700">
                                        {" "}
                                        {result.last_name}
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
            (text) => {},
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
