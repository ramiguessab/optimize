"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormLabel,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
    id: z.string().nonempty("Please fill this field"),
});

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { id: "" },
    });

    return (
        <div className="pt-4">
            <Card className="max-w-lg mx-auto max-md:bg-none max-md:bg-transparent max-md:dark:bg-transparent max-md:border-none">
                <CardHeader className="text-center">
                    <CardTitle>Certificate</CardTitle>
                    <CardDescription className="text-balance">
                        Please enter the id you recived in the the email we sent
                        your to get your certificate and you become OPTIMIZED 🚀
                        🥳
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(async (values) => {
                            const { pdf } = await import("@react-pdf/renderer");
                            const { Certificate } = await import(
                                "@/components/certificate/certificate"
                            );
                            const blob = await pdf(
                                <Certificate name="rami" />
                            ).toBlob();
                            window.open(URL.createObjectURL(blob));
                        })}
                    >
                        <CardContent className="flex flex-col gap-6">
                            <FormField
                                name="id"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between">
                                            <FormLabel>ID</FormLabel>
                                            <FormMessage />
                                        </div>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="222cfee40bc0575b81c96c0b0230be0a"
                                            />
                                        </FormControl>

                                        <FormDescription>
                                            It is in your email
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                        </CardContent>

                        <CardFooter>
                            <Button
                                className="w-full dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:text-white bg-yellow-500 hover:bg-yellow-600 "
                                type="submit"
                            >
                                Get Certificate
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
