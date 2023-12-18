"use client";

import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { Instagram, Facebook, Linkedin } from "lucide-react";
const RegistrationForm = dynamic(() => import("@/components/register/form"), {
    loading: () => null,
});

const Register = () => {
    return (
        <div className="flex flex-col gap-8 max-w-screen-lg mx-auto p-8">
            <h1 className="text-5xl font-bold mx-auto leading-tight">
                Optimize 2nd Edition Registration Form 🚀
            </h1>
            <div className="flex gap-2">
                <a
                    href="https://www.instagram.com/optimize.jijel/"
                    target="_blank"
                >
                    <Button
                        size={"icon"}
                        className="dark:text-zinc-200 bg-gradient-to-bl from-[#405DE6] via-[#5851DB]  via-[#833AB4]  via-[#C13584]  via-[#FD1D1D]  to-[#FFDC80]"
                    >
                        <Instagram />
                    </Button>
                </a>
                <a
                    href="https://www.facebook.com/optimize.jijel"
                    target="_blank"
                >
                    <Button
                        size={"icon"}
                        className="dark:text-zinc-200 bg-sky-700 dark:bg-sky-700 hover:dark:bg-sky-500 hover:bg-sky-500"
                    >
                        <Facebook />
                    </Button>
                </a>
                <a
                    href="https://www.linkedin.com/company/optimize-association/"
                    target="_blank"
                >
                    <Button
                        size={"icon"}
                        className="dark:text-zinc-200 bg-slate-800 dark:bg-slate-800 hover:dark:bg-slate-600 hover:bg-slate-600"
                    >
                        <Linkedin />
                    </Button>
                </a>
            </div>
            <RegistrationForm />
        </div>
    );
};

export default function Form() {
    return <Register />;
}
