import Link from "next/link";
import ThemeToggle from "./navbar/darkMode";
import { Button } from "./ui/button";
import Image from "next/image";
import moment from "moment";

export default async function NavigationBar() {
    const canTakeCertificate = moment(
        "25 12 2023 18",
        "DD MM yyyy HH"
    ).isSameOrBefore();

    return (
        <div className="border-b-2 dark:border-b-zinc-900 sborder-b-zinc-100 flex flex-row justify-between items-center p-6 backdrop-blur-sm backdrop-grayscale dark:backdrop-brightness-50 sticky top-0">
            <Link href={"/"}>
                <Image
                    src={"/optimize_logo.png"}
                    alt={"optimize logo"}
                    width={64}
                    height={64}
                    priority
                />
            </Link>
            <div className="flex items-center gap-4">
                {canTakeCertificate && (
                    <Link href={"/profile/certificate"}>
                        <Button variant={"ghost"}>Take Your Certificate</Button>
                    </Link>
                )}

                <ThemeToggle />
            </div>
        </div>
    );
}
