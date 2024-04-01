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
import { signin } from "@/server/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icons } from "@/components/ui/icons";
import { toast } from "sonner";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(5, { message: "Password must be at least 5 characters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/, {
            message:
                "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function SigninForm() {
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { isPending, mutateAsync } = useMutation({
        mutationFn: () =>
            signin({
                email: form.getValues().email,
                password: form.getValues().password,
            }),
    });

    const onSubmit = async () => {
        const result = await mutateAsync();

        if (result?.error) {
            return toast.error(
                result.error ?? "An error occurred. Please try again.",
            );
        }

        toast.success("You have been signed in.");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                Enter the email address you want to use for sign
                                in
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
                                Enter the password for your account.
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
                    {isPending ? <Icons.spinner className="h-4 w-4" /> : null}
                    <span>{isPending ? "Signing in..." : "Sign in"}</span>
                </Button>
            </form>
        </Form>
    );
}
