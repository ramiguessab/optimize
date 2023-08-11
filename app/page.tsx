import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import RegistrationForm from "@/components/register/form";

export default function Register() {
    return (
        <div className="flex flex-col gap-8 max-w-screen-lg mx-auto p-8">
            <h1 className="text-5xl font-bold mx-auto leading-tight">
                Optimize Registration Form 🚀
            </h1>
            <div className="flex gap-2">
                <Button
                    size={"icon"}
                    className="bg-gradient-to-bl from-[#405DE6] via-[#5851DB]  via-[#833AB4]  via-[#C13584]  via-[#FD1D1D]  to-[#FFDC80]"
                >
                    <Instagram />
                </Button>
                <Button size={"icon"} className="bg-sky-700">
                    <Facebook />
                </Button>
                <Button size={"icon"} className="bg-slate-800">
                    <Linkedin />
                </Button>
            </div>
            <RegistrationForm />
        </div>
    );
}
