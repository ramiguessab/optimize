"use client";
import { useEffect, useState } from "react";

function checkTheme() {
    const localStorageTheme = localStorage.getItem("theme");
    if (
        localStorageTheme === "dark" ||
        (!localStorageTheme &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        return "dark";
    } else {
        return "light";
    }
}

function setLocalStorage(theme: "dark" | "light") {
    localStorage.setItem("theme", theme);

    return theme;
}

export default function useTheme(): ["dark" | "light", () => void] {
    const [theme, setTheme] = useState<"light" | "dark">(
        (typeof window === "undefined" && "dark") || checkTheme()
    );
    useEffect(() => {
        const html = document.querySelector("html");
        if (theme === "light") {
            html!.className = "";
        } else {
            html!.className = "dark";
        }
    }, [theme]);
    return [
        theme,
        () => {
            setTheme((prev) =>
                prev === "dark"
                    ? setLocalStorage("light")
                    : setLocalStorage("dark")
            );
        },
    ];
}
