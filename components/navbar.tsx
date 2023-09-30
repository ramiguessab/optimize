"use client";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import useTheme from "@/hooks/useTheme";
import Image from "next/image";

export default function NavigationBar() {
    const pathname = usePathname();
    const splitedPath = pathname.split("/");
    const [theme, toggleTheme] = useTheme();

    if (
        splitedPath.length >= 3 &&
        splitedPath.includes("admin") &&
        splitedPath.includes("quiz")
    ) {
        return null;
    } else {
        return (
            <div className="border-b-2 dark:border-b-zinc-900 sborder-b-zinc-100 flex flex-row justify-between items-center p-6 backdrop-blur-sm backdrop-grayscale dark:backdrop-brightness-50 sticky top-0">
                <Link href={"/"}>
                    <Image
                        src={"/optimize_logo.png"}
                        alt={"optimize logo"}
                        width={64}
                        height={64}
                    />
                </Link>
                <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => {
                        toggleTheme();
                    }}
                >
                    {theme === "dark" ? <Sun /> : <Moon />}
                </Button>
            </div>
        );
    }
}
