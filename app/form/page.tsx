import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import RegistrationForm from "@/components/register/form";

const Register = async () => {
    return (
        <div className="flex flex-col gap-8 max-w-screen-lg mx-auto p-8">
            <h1 className="text-5xl font-bold mx-auto leading-tight">
                Optimize Registration Form 🚀
            </h1>
            <div className="flex gap-2">
                <Button
                    size={"icon"}
                    className="dark:text-zinc-200 bg-gradient-to-bl from-[#405DE6] via-[#5851DB]  via-[#833AB4]  via-[#C13584]  via-[#FD1D1D]  to-[#FFDC80]"
                >
                    <Instagram />
                </Button>
                <Button
                    size={"icon"}
                    className="dark:text-zinc-200 bg-sky-700 dark:bg-sky-700"
                >
                    <Facebook />
                </Button>
                <Button
                    size={"icon"}
                    className="dark:text-zinc-200 bg-slate-800 dark:bg-slate-800"
                >
                    <Linkedin />
                </Button>
            </div>
            <RegistrationForm />
        </div>
    );
};

export default function Form() {
    return <Register />;
}
