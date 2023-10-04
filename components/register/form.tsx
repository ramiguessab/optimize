"use client";

import SuccessSubmission from "../success";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "../ui/scroll-area";
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
import FirestoreRequest from "@/firebase/firestore";

const formSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    birth_year: z.string(),
    work: z.string(),
    more: z.string(),
    first_edition: z.string(),
});

export type RegistrationSchema = z.infer<typeof formSchema>;

export default function RegistrationForm() {
    const [submited, setSubmited] = useState(false);

    const form = useForm<RegistrationSchema>({
        defaultValues: { first_name: "", email: "", last_name: "", more: "" },
        resolver: zodResolver(formSchema),
    });

    return (
        <Form {...form}>
            <form
                className="flex gap-8 flex-col"
                onSubmit={form.handleSubmit((value) => {
                    new FirestoreRequest("registered")
                        .addDoc({
                            ...value,
                            accepted: false,
                            email_sent: false,
                            birth_year: parseInt(value.birth_year),
                            first_edition:
                                value.first_edition === "yes" ? true : false,
                        })
                        .then(() => {
                            window.scrollTo(0, 0);
                            setSubmited(true);
                        });
                })}
            >
                <Confetti running={submited} />
                <SuccessSubmission open={submited} />
                <FormField
                    name="first_name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input {...field}></Input>
                            </FormControl>
                            <FormDescription>
                                Your first name Please 😄
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="last_name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input {...field}></Input>
                            </FormControl>
                            <FormDescription>
                                Your last name too 😁
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field}></Input>
                            </FormControl>
                            <FormDescription>
                                Let Us Contact You 😉
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="first_edition"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                You been present in 1st Edition?
                            </FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1 gap-2"
                                >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="no" />
                                        </FormControl>
                                        <FormLabel>No</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="yes" />
                                        </FormControl>
                                        <FormLabel>Yes</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormDescription>
                                It was good but we gonna optimize it more 🚀
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="birth_year"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Birth Year</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={
                                                "Select Your Birthyear"
                                            }
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <ScrollArea>
                                    <SelectContent className="h-80">
                                        {[...Array(100)].map((_, index) => (
                                            <SelectItem
                                                value={`${2023 - index}`}
                                                key={index}
                                            >
                                                {`${2023 - index}`}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </ScrollArea>
                            </Select>
                            <FormDescription>
                                Happy Birth Year 😅
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="work"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Work</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={
                                                "Select Your Current Work"
                                            }
                                        ></SelectValue>
                                    </SelectTrigger>
                                </FormControl>
                                <ScrollArea>
                                    <SelectContent className="max-h-80">
                                        <SelectItem value={`student`}>
                                            {`Student`}
                                        </SelectItem>
                                    </SelectContent>
                                </ScrollArea>
                            </Select>
                            <FormDescription>Niiice 🫡</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="more"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tell us more</FormLabel>

                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="We just love to know our people more 😇"
                                    className="resize-none"
                                ></Textarea>
                            </FormControl>

                            <FormDescription>
                                Good Human Being 🤗
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {!submited && (
                    <Button className="bg-yellow-500 dark:bg-yellow-600 dark:text-white dark:hover:text-neutral-950">
                        Submit
                    </Button>
                )}
            </form>
        </Form>
    );
}
