import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { siteUrls } from "@/config/urls";
import { SigninForm } from "@/components/signin-form";
import { validateAuth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function SigninPage() {
    const { session } = await validateAuth();

    if (session) redirect(siteUrls.app);

    return (
        <main className="container relative grid min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
            <header className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between md:left-8 md:right-8 md:top-8">
                <Link href={siteUrls.home} className="text-2xl font-bold">
                    Prompt.
                </Link>
                <Link
                    href={siteUrls.signup}
                    className={cn(buttonVariants({ variant: "ghost" }))}
                >
                    Sign up
                </Link>
            </header>
            <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
                <div className="absolute inset-0 bg-secondary" />
                <div className="relative z-20 mt-auto hidden lg:block">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo; Prompt is a great tool to generate
                            high-quality prompts for ChatGpt and other AI
                            models. It&rsquo;s easy to use and has a lot of
                            customization options. I highly recommend it to
                            anyone looking to generate creative prompts for
                            their AI models.&rdquo; &rdquo;
                        </p>
                    </blockquote>
                </div>
            </div>
            <div className="py-24 lg:px-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Welcome back!
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to sign in
                        </p>
                    </div>
                    <SigninForm />
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking Sign in, you agree to our{" "}
                        <Link
                            href="/terms"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/privacy"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </main>
    );
}
