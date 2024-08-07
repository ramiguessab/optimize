"use client";
import { useState } from "react";
import { MessageFormSchema, messageSchema } from "@/lib/message";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import SuccessSubmission from "./success";
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
        <>
            <SuccessSubmission open={form.formState.isSubmitSuccessful} />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(async ({ message }) => {
                        const href = window.location.href;
                        await fetch(`${href}/api`, {
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
                                        placeholder="Don't be shy 😄 Please share your thoughts"
                                        className="resize-none"
                                    />
                                </FormControl>

                                <FormDescription>
                                    See yaa😃 thank you for your feedback
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={
                            form.formState.isSubmitting ||
                            form.formState.isSubmitSuccessful
                        }
                        type="submit"
                        className="bg-yellow-500 dark:bg-yellow-600 dark:text-white dark:hover:text-neutral-950 w-full"
                    >
                        {form.formState.isSubmitSuccessful ||
                        form.formState.isSubmitting
                            ? "Loading..."
                            : "Submit"}
                    </Button>
                </form>
            </Form>
        </>
    );
}
