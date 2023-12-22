"use client";
import React from "react";
import { MessageFormSchema, messageSchema } from "@/lib/message";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export default function MessagesForm() {
    const form = useForm<MessageFormSchema>({
        defaultValues: { message: "" },
        resolver: zodResolver(messageSchema),
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(({ message }) => {
                    const href = window.location.href;
                    fetch(`${href}/api`, {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({ message }),
                    });
                })}
                className="flex flex-col gap-8"
            >
                <FormField
                    name="message"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Messsage</FormLabel>

                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Dont be shy 😁"
                                    className="resize-none"
                                />
                            </FormControl>

                            <FormDescription>See yaaaa😝</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="bg-yellow-500 dark:bg-yellow-600 dark:text-white dark:hover:text-neutral-950 w-full"
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
}
