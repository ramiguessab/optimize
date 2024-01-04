import Register from "@/components/register/register";
import moment from "moment";
import Link from "next/link";

const ClosedRegistration = () => {
    return (
        <main className="flex flex-col gap-8 max-w-screen-lg mx-auto p-8 text-center">
            <p className="text-9xl animate-bounce">🚀</p>
            <h1 className="text-5xl font-bold mx-auto leading-tight underline decoration-4 decoration-yellow-200">
                Thank you!!!
            </h1>
            <p className="text-3xl font-bold mx-auto leading-tight">
                See you next time 🤗 but you can send us an{" "}
                <Link
                    href="/messages"
                    className="text-extrabold underline decoration-2"
                >
                    anonymous message
                </Link>{" "}
                it will be great.💌
            </p>
        </main>
    );
};

export default async function Form() {
    // // const registrations_closed = moment(
    // //     "23 12 2023 00",
    // //     "DD MM yyyy HH"
    // // ).isSameOrBefore();
    // // if (registrations_closed) {
    return <ClosedRegistration />;
    // // }

    // return <Register />;
}
