import { Sun } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

export default function NavigationBar() {
    return (
        <div className="border-b-2 flex flex-row justify-between items-center p-6 backdrop-blur-sm sticky top-0">
            <Image
                src={"/optimize_logo.png"}
                alt={"optimize logo"}
                width={64}
                height={64}
            />
            <Button variant={"outline"} size={"icon"}>
                <Sun />
            </Button>
        </div>
    );
}
