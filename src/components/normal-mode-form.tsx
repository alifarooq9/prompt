"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useState } from "react";
import { Icons } from "@/components/ui/icons";
import { ResponseForm } from "@/components/response-form";
import { Skeleton } from "@/components/ui/skeleton";
import type { Body } from "@/types/prompt-api";
import { toast } from "sonner";

const formSchema = z.object({
    topic: z.string().min(3, "Your input is too short!"),
});

export function NormalModeForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            topic: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    const [response, setResponse] = useState<string>("");

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/v1/prompt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mode: "normal",
                    topic: data.topic,
                } as Body),
            });

            const json = (await res.json()) as { content: string };

            setResponse(json.content);
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Give me a ChatGpt Prompt to:
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Tell me why cats are better than dogs."
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This will be used to generate a prompt for
                                    ChatGPT.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="gap-2">
                        {isLoading ? (
                            <Icons.spinner className="h-4 w-4" />
                        ) : null}
                        <span>
                            {isLoading ? "Generating..." : "Generate Prompt"}
                        </span>
                    </Button>
                </form>
            </Form>

            {isLoading ? (
                <div className="mt-8 grid gap-4">
                    <h2 className="text-lg font-semibold">
                        Use this prompt to generate a response:
                    </h2>

                    <Skeleton className="h-32 w-full" />
                </div>
            ) : response ? (
                <ResponseForm key={response} response={response} />
            ) : null}
        </div>
    );
}
