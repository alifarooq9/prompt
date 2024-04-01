import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { siteUrls } from "@/config/urls";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "react-wrap-balancer";

export default function HomePage() {
    return (
        <main className="container flex flex-col items-center gap-6 py-14">
            <Wrapper
                as="h1"
                className="max-w-3xl text-center text-3xl font-bold leading-tight sm:text-3xl md:text-5xl"
            >
                Generate Prompts for ChatGPT or AI Chatbots
            </Wrapper>
            <Wrapper
                as="p"
                className="max-w-3xl text-center text-sm text-muted-foreground sm:text-base md:text-lg"
            >
                Generate prompts for AI chatbots like ChatGPT, GPT-3, and others
                with a simple and easy-to-use interface. You can generate
                prompts for various use cases like chatbots, creative writing,
                and more.
            </Wrapper>
            <div className="flex w-full max-w-xs flex-col items-center gap-3 sm:w-fit sm:flex-row">
                <Link
                    href={siteUrls.app}
                    className={buttonVariants({ className: "w-full sm:w-fit" })}
                >
                    Generate Prompts
                </Link>
                <Link
                    href="/gh"
                    className={buttonVariants({
                        variant: "outline",
                        className: "w-full gap-2 sm:w-fit",
                    })}
                >
                    <Icons.gitHub className="h-4 w-4" />
                    <span>Github</span>
                </Link>
            </div>

            <div className="relative mt-10 block dark:hidden">
                <Image
                    src={`/app-screenshort-light.png`}
                    alt="App screenshot"
                    width={2432}
                    height={1442}
                    className="rounded-md"
                    loading="eager"
                    blurDataURL="/app-screenshort-light.png"
                    placeholder="blur"
                />
            </div>

            <div className="relative mt-10 hidden dark:block">
                <Image
                    src={`/app-screenshort-dark.png`}
                    alt="App screenshot"
                    width={2432}
                    height={1442}
                    className="rounded-md"
                />
            </div>
        </main>
    );
}
