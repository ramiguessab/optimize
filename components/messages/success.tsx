import { Button } from "../ui/button";

import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

interface ISuccessSubmissionProps {
    open: boolean;
}

export default function SuccessSubmission({ open }: ISuccessSubmissionProps) {
    return (
        <>
            <Dialog open={open}>
                <DialogContent className="gap-4">
                    <DialogHeader className="gap-4">
                        <DialogTitle>Message Sent 🎊</DialogTitle>
                        <DialogDescription className="text-balance">
                            THANK YOU!!!!
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
