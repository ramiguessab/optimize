import Link from "next/link";
import ThemeToggle from "./navbar/darkMode";
import { Button } from "./ui/button";
import Image from "next/image";
import moment from "moment";

export default async function NavigationBar() {
    const eventDay = moment("23 11 2023", "DD MM yyyy");
    const today = new Date();
    const isEventStarted = eventDay.isSameOrBefore(today, "day");
    const isEventDay = eventDay.isSame(today, "day");

    const workshopsDay = eventDay.clone().add(1, "day");

    const isEventEnds = workshopsDay.isBefore(today, "day");

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
                {isEventStarted ? (
                    <>
                        {isEventEnds ? (
                            <Link href={"/profile/certificate"}>
                                <Button variant={"ghost"}>
                                    Take Your Certificate
                                </Button>
                            </Link>
                        ) : (
                            <Button variant={"outline"} disabled>
                                You Will Take Your Certificate Here
                            </Button>
                        )}
                        {isEventDay ? (
                            <Link href={"/games/quiz"}>
                                <Button variant={"ghost"}>Take The Quiz</Button>
                            </Link>
                        ) : null}
                    </>
                ) : null}

                <ThemeToggle />
            </div>
        </div>
    );
}
