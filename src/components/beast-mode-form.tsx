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
import { TextareaAutosize } from "@/components/ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
    topic: z.string().min(3, "Your topic is too short!"),
    role: z.string().min(3, "Your role is too short!"),
    objective: z.string().min(3, "Your objective is too short!"),
    audience: z.string().min(3, "Your audience is too short!"),
    format: z.string().min(3, "Your format is too short!"),
    conciseness: z.string().min(3, "Your conciseness is too short!"),
    context: z.string().min(3, "Your context is too short!"),
    additionalInfo: z.string().min(3, "Your additional info is too short!"),
});

export function BeastModeForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            topic: "",
            role: "",
            objective: "",
            audience: "",
            format: "",
            conciseness: "",
            context: "",
            additionalInfo: "",
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
                    mode: "beast",
                    topic: data.topic,
                    role: data.role,
                    objective: data.objective,
                    audience: data.audience,
                    format: data.format,
                    conciseness: data.conciseness,
                    context: data.context,
                    additionalInfo: data.additionalInfo,
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
                                        placeholder="Write an informative speech about cats."
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

                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>You are a(n):</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="professional copywriter."
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Your Role: Who are you in this scenario?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="objective"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Objective in this scenario:
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="to write a persuasive essay."
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Your Objective: What are you trying to
                                    achieve?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="audience"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Audience in this scenario:
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="a group of high school students."
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Your Audience: Who are you speaking to?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="format"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Format & structure of the content you need:
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="a 300 words blog post."
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Format: What format will you be using?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="conciseness"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Conciseness & tone of the content:
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="clear and concise."
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Conciseness: What is the tone of the
                                    content?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="context"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Context or background information:
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="a blog post about cats."
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Context: What is the context of the content?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="additionalInfo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Additional information or requirements:
                                </FormLabel>
                                <FormControl>
                                    <TextareaAutosize
                                        placeholder="include some interesting facts."
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Additional Info: Any other requirements?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        disabled={isLoading}
                        type="submit"
                        className="gap-2"
                    >
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
