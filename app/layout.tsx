import "./globals.css";
import type { Metadata } from "next";
import NavigationBar from "@/components/navbar";
import AdminNavbar from "@/components/admin/adminNavbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Nunito } from "next/font/google";

// const nunito = Nunito({ weight: ["800"], subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Optimize",
    description: "Welcome to Optimize Official Website",
    icons: ["/optimize_logo.png"],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={` dark:bg-black dark:text-neutral-300 selection:bg-yellow-200 dark:selection:bg-yellow-500 dark:selection:text-white selection:text-black`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NavigationBar />
                    {children}
                    <AdminNavbar />
                </ThemeProvider>
            </body>
        </html>
    );
}
