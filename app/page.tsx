import Register from "@/components/register/register";
import moment from "moment";

const ClosedRegistration = () => {
    return (
        <main className="flex flex-col gap-8 max-w-screen-lg mx-auto p-8 text-center">
            <p className="text-9xl animate-bounce">🚀</p>
            <h1 className="text-5xl font-bold mx-auto leading-tight underline decoration-4 decoration-yellow-200">
                Registrations are closed
            </h1>
            <p className="text-3xl font-bold mx-auto leading-tight">
                Stay tuned to our social media 📱 we will send emails 📧 any
                time.
            </p>
        </main>
    );
};

export default async function Form() {
    const registrations_closed = moment(
        "23 12 2023 00",
        "DD MM yyyy HH"
    ).isSameOrBefore();
    if (registrations_closed) {
        return <ClosedRegistration />;
    }

    return <Register />;
}
