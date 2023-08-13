"use client";
import { Sun } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function NavigationBar() {
    const pathname = usePathname();
    const splitedPath = pathname.split("/");

    if (
        splitedPath.length >= 3 &&
        splitedPath.includes("admin") &&
        splitedPath.includes("quiz")
    ) {
        return null;
    } else {
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
}
