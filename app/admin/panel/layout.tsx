import { cookies } from "next/headers";

import { permanentRedirect } from "next/navigation";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const password = cookies().get("password")?.value;

    if (password !== "87691") {
        return permanentRedirect("/admin/");
    }
    return <>{children}</>;
}
