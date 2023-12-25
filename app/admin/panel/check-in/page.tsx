"use client";
import { workshops } from "@/lib/form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Html5Qrcode } from "html5-qrcode";
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

interface ICheckIn {
    accepted: boolean;
    full_name: string;
    email: string;
    email_sent: boolean;
    expectation: string;
    best_part: string;
    how_did_know: string;
    lunch: "yes" | "no";
    occupation: string;
    tell_something: string;
    why_choose_you: string;
    workshop: typeof workshops;
    checked_1st: boolean;
    checked_2nd: boolean;
}

interface DialogResult {
    used: boolean;
    found: boolean;
    first_name: string;
    last_name: string;
}

interface IState {
    status: "loading" | "found" | "not found";
    data: ICheckIn | null;
}

const ResultDialog = ({
    id,
    setId,
}: {
    id: string;
    setId: (id: string) => void;
}) => {
    const [state, setState] = useState<IState>({
        status: "loading",
        data: null,
    });

    useEffect(() => {
        new FirestoreRequest("registered").getDoc(id).then((doc) => {
            const check_in = doc as DocumentSnapshot;
            const found = check_in.exists();
            if (found) {
                const data = check_in.data() as ICheckIn;
                setState({ status: "found", data });
            } else {
                setState({ status: "not found", data: null });
            }
        });
    }, [id]);

    if (state.status === "loading") {
        return null;
    }

    return (
        <Dialog defaultOpen>
            <DialogContent className="max-w-sm capitalize">
                <DialogHeader>
                    <DialogTitle>check in result</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                {state.status === "not found" ? (
                    <p>USER NOT FOUND</p>
                ) : state.data?.checked_2nd ? (
                    <p>Used QR Code</p>
                ) : (
                    <div>
                        <div>
                            <span>Full Name:</span>{" "}
                            <span>{state.data?.full_name}</span>
                        </div>
                        <div>
                            <span>Accepted:</span>{" "}
                            <span>{state.data?.accepted ? "✅" : "❌"}</span>
                        </div>
                        <div>
                            <span>Workshop:</span>{" "}
                            <span>{state.data?.workshop}</span>
                        </div>
                        {/* <div>
                            <span>Lunch:</span>{" "}
                            <span>{state.data?.lunch ? "✅" : "❌"}</span>
                        </div> */}
                        <div>
                            <span>Email:</span> <span>{state.data?.email}</span>
                        </div>
                    </div>
                )}
                <DialogFooter className="flex">
                    {/* {state.data?.lunch && !state.data.checked_1st ? (
                        <div className="flex flex-col gap-2">
                            <Button
                                className="w-full"
                                onClick={() => {
                                    if (state.status === "found") {
                                        new FirestoreRequest("registered")
                                            .updateDoc(id, {
                                                checked_1st: true,
                                            })
                                            .then(() => {
                                                setId("");
                                            });
                                    }
                                }}
                            >
                                Payed for Lunch
                            </Button>

                            <Button
                                className="w-full"
                                onClick={() => {
                                    if (state.status === "found") {
                                        new FirestoreRequest("registered")
                                            .updateDoc(id, {
                                                lunch: "no",
                                                checked_1st: true,
                                            })
                                            .then(() => {
                                                setId("");
                                            });
                                    }
                                }}
                            >
                                Not Payed
                            </Button>
                        </div>
                    ) : ( */}
                    <Button
                        className="w-full"
                        onClick={() => {
                            if (
                                state.status === "found" &&
                                !state.data!.checked_2nd
                            ) {
                                new FirestoreRequest("registered")
                                    .updateDoc(id, { checked_2nd: true })
                                    .then(() => {
                                        setId("");
                                    });
                            } else {
                                setId("");
                            }
                        }}
                    >
                        Okey
                    </Button>
                    {/* )} */}
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
            (id) => {
                setId(id);
            },
            () => {}
        );
    }, []);

    return (
        <div className="h-[calc(100dvh_-_106px)] pt-8">
            {id !== "" && <ResultDialog id={id} setId={setId} />}
            <div id="qr" />
        </div>
    );
}
