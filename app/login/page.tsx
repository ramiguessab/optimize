"use client";
import React from "react";
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
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
});

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    return (
        <div className="pt-4">
            <Card className="max-w-lg mx-auto max-md:bg-none max-md:bg-transparent max-md:dark:bg-transparent max-md:border-none">
                <CardHeader className="text-center">
                    <CardTitle>Login Form</CardTitle>
                    <CardDescription className="text-balance">
                        Please login so you can get into your vault or any
                        provided content and don&apos;t worry if you are
                        accepted you are already registred 😉
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((values) => {
                            console.log(values);
                        })}
                    >
                        <CardContent className="flex flex-col gap-6">
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between">
                                            <FormLabel>Email</FormLabel>
                                            <FormMessage />
                                        </div>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="you@email.com"
                                            />
                                        </FormControl>

                                        <FormDescription>
                                            The same email you used in the event
                                            form
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between">
                                            <FormLabel>Password</FormLabel>
                                            <FormMessage />
                                        </div>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder="********"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The password is sent to your email
                                            when we approved you
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                        </CardContent>

                        <CardFooter>
                            <Button
                                className="w-full dark:bg-yellow-600 dark:text-white bg-yellow-500 text-black"
                                type="submit"
                            >
                                Login
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
