import { Button } from "./ui/button";

import Confetti from "react-confetti";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import * as RDXDialog from "@radix-ui/react-dialog";

interface ISuccessSubmissionProps {
    open: boolean;
}

export default function SuccessSubmission({ open }: ISuccessSubmissionProps) {
    return (
        <Dialog open={open}>
            <Confetti style={{ zIndex: 50 }} run={open} />
            <DialogContent className="gap-4">
                <DialogHeader className="gap-4">
                    <DialogTitle>Successfuly Registred 🎊</DialogTitle>
                    <DialogDescription className="text-balance">
                        THANK YOU!!!! The submition is now sent and we will
                        respond to you so stay tuned in our socials to remind
                        you that we sent the emails
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Link href={"/"} className="w-full">
                        <Button className="w-full">Goodbye!!!!</Button>
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
