"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signup } from "@/server/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icons } from "./ui/icons";

const formSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(5, { message: "Password must be at least 5 characters" })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/, {
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
            }),
        confirmPassword: z
            .string()
            .min(5, { message: "Password must be at least 5 characters" })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/, {
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
            }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type FormSchemaType = z.infer<typeof formSchema>;

export function SignupForm() {
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const { isPending, mutate } = useMutation({
        mutationFn: () =>
            signup({
                email: form.getValues().email,
                password: form.getValues().password,
            }),
    });

    function onSubmit() {
        mutate();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the email address you want to use for your
                                account
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Password must contain at least one uppercase
                                letter, one lowercase letter, and one number
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Please confirm your password
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full gap-2"
                >
                    {isPending ? (
                        <Icons.spinner className="h-4 w-4 animate-spin" />
                    ) : null}
                    <span>Create</span>
                </Button>
            </form>
        </Form>
    );
}
