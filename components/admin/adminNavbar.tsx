"use client";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import {
    Lightbulb,
    LucideIcon,
    ClipboardCheck,
    Sheet,
    MessageCircle,
} from "lucide-react";
import React from "react";
import Link from "next/link";

interface IRouter {
    displayName: string;
    route: string;
    icon: LucideIcon;
}

const routes: IRouter[] = [
    {
        displayName: "sheet",
        route: "/admin/panel/table",
        icon: Sheet,
    },
    {
        displayName: "messsages",
        route: "/admin/panel/messages",
        icon: MessageCircle,
    },
    {
        displayName: "quiz",
        route: "/admin/panel/quiz",
        icon: Lightbulb,
    },
    {
        displayName: "check in",
        route: "/admin/panel/check-in",
        icon: ClipboardCheck,
    },
];

export default function AdminNavbar() {
    const pathname = usePathname();
    if (pathname.startsWith("/admin/panel/")) {
        return (
            <div className="bg-neutral-50 dark:bg-neutral-950 dark:border-neutral-800 mb-4 px-4 py-2 border rounded-xl gap-2 w-fit fixed left-0 right-0 bottom-0  mx-auto flex">
                {routes.map((route) => {
                    const selected = pathname === route.route;

                    return (
                        <Link href={route.route} key={route.route}>
                            <Button
                                variant={selected ? "default" : "ghost"}
                                className="gap-2 capitalize"
                            >
                                <route.icon />
                                {selected && route.displayName}
                            </Button>
                        </Link>
                    );
                })}
            </div>
        );
    } else {
        return null;
    }
}
