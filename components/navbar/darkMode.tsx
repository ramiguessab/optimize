"use client";
import { Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
export default function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    return (
        <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => {
                theme === "light" ? setTheme("dark") : setTheme("light");
            }}
        >
            <Sun className="dark:hidden" />
            <Moon className="hidden dark:block" />
        </Button>
    );
}
