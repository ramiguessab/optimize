import { cookies } from "next/headers";

import { permanentRedirect } from "next/navigation";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const password = cookies().get("password")?.value;

    if (password !== ADMIN_PASSWORD) {
        return permanentRedirect("/admin/");
    }
    return <>{children}</>;
}
