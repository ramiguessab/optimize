"use client";
import SuccessSubmission from "../success";
import dynamic from "next/dynamic";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import Confetti from "../confetti";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export const workshops = [
    "None",
    "Ai in finance (الذكاء الاصطناعي في التمويل) ",
    "Ai in robotics (الذكاء الاصطناعي في الربوتات)",
    "Ai in marketing (الذكاء الاصطناعي في التسويق)",
    "Ai in design (الذكاء الاصطناعي في التصميم)",
    "Ai in startups (الذكاء الاصطناعي في الشركات الناشئة)",
] as const;

const formSchema = z.object({
    full_name: z.string().nonempty("Required"),
    email: z.string().email().nonempty("Required"),
    occupation: z.string().nonempty("Required"),
    tell_something: z.string().nonempty("Required"),
    how_did_know: z.string().nonempty("Required"),
    best_part: z.string().nonempty("Required"),
    expectation: z.string().nonempty("Required"),
    lunch: z.enum(["yes", "no"]),
    workshop: z.enum(workshops),
    why_choose_you: z.string().nonempty("Required"),
});

export type RegistrationSchema = z.infer<typeof formSchema>;

export default function RegistrationForm() {
    const [submited, setSubmited] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<RegistrationSchema>({
        defaultValues: {
            full_name: "",
            email: "",
            occupation: "",
            best_part: "",
            expectation: "",
            how_did_know: "",
            lunch: undefined,
            tell_something: "",
            why_choose_you: "",
            workshop: undefined,
        },
        resolver: zodResolver(formSchema),
    });

    return (
        <Form {...form}>
            <form
                className="flex gap-8 flex-col direction-reverse"
                onSubmit={form.handleSubmit(async (value) => {
                    const FirestoreRequest = (
                        await import("@/firebase/firestore")
                    ).default;
                    setLoading(true);

                    new FirestoreRequest("registered")
                        .addDoc({
                            ...value,
                            accepted: false,
                            email_sent: false,
                        })
                        .then(() => {
                            window.scrollTo(0, 0);
                            setSubmited(true);
                        });
                })}
            >
                <Confetti running={submited} />
                <SuccessSubmission open={submited} />
                <div className="">
                    <h2 className="text-2xl">First Day (اليوم الاول)</h2>
                    <div className="border border-dashed border-neutral-300" />
                </div>
                <FormField
                    name="full_name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name (الاسم الكامل)</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="John Doe"
                                ></Input>
                            </FormControl>
                            <FormDescription>
                                Your full name Please 😄
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email (البريد الالكتروني)</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="you@email.com"
                                ></Input>
                            </FormControl>
                            <FormDescription>Your email too 😁</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="occupation"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Occupation (مهنتك)</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Student"></Input>
                            </FormControl>
                            <FormDescription>Niiice 🫡</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="tell_something"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Tell us something about you? (اخبرنا شيء عن
                                نفسك؟)
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="We just love to know our people more 😇"
                                    className="resize-none"
                                />
                            </FormControl>

                            <FormDescription>
                                Good Human Being 🤗
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="how_did_know"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                How did you hear about Optimize? (كيف تعرفت على
                                اوبتيمايز؟)
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Social Media"
                                ></Input>
                            </FormControl>
                            <FormDescription>
                                He/She is a good friend or you scroll a lot 🤔
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="best_part"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Best Part of Optimize? (افضل جزء من اوبتيمايز؟)
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="The fun part"
                                ></Input>
                            </FormControl>
                            <FormDescription>
                                I am sure you liked the 1st edition 😉
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="expectation"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                What do you expect from Optimize? (ماذا تتوقع من
                                اوبتيمايز؟)
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Something very niiice"
                                ></Input>
                            </FormControl>
                            <FormDescription>
                                You will see better 😊
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="lunch"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                اليوم سيكون طويلا و قد تحتاج للأكل للحفاظ على
                                تركيزك هل تريد الحصول على وجبة الغداء( سندويتش +
                                مشروب ) مقابل 200 دج ؟
                            </FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1 gap-2"
                                >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={"yes"} />
                                        </FormControl>
                                        <FormLabel>Yes</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={"no"} />
                                        </FormControl>
                                        <FormLabel>No</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormDescription>
                                يرجى العلم أن عدد الحاضرين محدود تأكد من أخذ
                                وقتك و الإجابة بدقة ،سيتم إعلام المختارين عن
                                طريق البريد الالكتروني قريبا ،راقب وسائل التواصل
                                الخاصة بنا حتى يصلك الجديد !
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="">
                    <h2 className="text-2xl">Second Day (اليوم الثاني)</h2>
                    <div className="border border-dashed border-neutral-300" />
                </div>
                <FormField
                    name="workshop"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Which workshop will you choose? (ماهي الورشة
                                التي ستقوم باختيارها ؟)
                            </FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={"Select Your Workshop"}
                                        />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    {workshops.map((workshops) => (
                                        <SelectItem
                                            value={workshops}
                                            key={workshops}
                                        >
                                            {workshops}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>See you there 🫡</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="why_choose_you"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Among all others applicants, why should we
                                choose you? (من بين جميع المتقدمين لماذا يجب
                                اختيارك؟)
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Just talk any thing or... let break the ice 🥶"
                                    className="resize-none"
                                />
                            </FormControl>

                            <FormDescription>
                                Nice to meet you 🤝
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    disabled={loading}
                    className="bg-yellow-500 dark:bg-yellow-600 dark:text-white dark:hover:text-neutral-950"
                >
                    {loading ? "Loading..." : "Submit"}
                </Button>
            </form>
        </Form>
    );
}
