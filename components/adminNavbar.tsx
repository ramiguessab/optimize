"use client";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Lightbulb, LucideIcon, ClipboardCheck, Sheet } from "lucide-react";
import React from "react";
import Link from "next/link";
import isPhone from "@/lib/isPhone";

interface IRouter {
    displayName: string;
    route: string;
    icon: LucideIcon;
}

const routes: IRouter[] = [
    {
        displayName: "sheet",
        route: "/",
        icon: Sheet,
    },
    {
        displayName: "quiz",
        route: "quiz",
        icon: Lightbulb,
    },
    {
        displayName: "check in",
        route: "check-in",
        icon: ClipboardCheck,
    },
];

export default function AdminNavbar() {
    const pathname = usePathname();
    const phone = isPhone();

    const pathSplited = pathname.split("/");
    if (pathSplited.includes("admin")) {
        return (
            <div className="bg-neutral-50 dark:bg-neutral-950 dark:border-neutral-800 mb-4 px-4 py-2 border rounded-xl gap-2 w-fit fixed left-0 right-0 bottom-0  mx-auto flex">
                {routes.map((route) => {
                    const selected =
                        pathSplited.at(-1) === route.route ||
                        (pathSplited.length === 2 && route.route === "/");
                    if (route.route === "check-in" && !phone) {
                        return null;
                    } else {
                        return (
                            <Link
                                href={`/admin/${route.route}`}
                                key={route.route}
                            >
                                <Button
                                    variant={selected ? "default" : "ghost"}
                                    className="gap-2 capitalize"
                                >
                                    <route.icon />
                                    {selected && route.displayName}
                                </Button>
                            </Link>
                        );
                    }
                })}
            </div>
        );
    } else {
        return null;
    }
}
