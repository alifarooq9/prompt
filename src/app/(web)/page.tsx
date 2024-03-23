import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { siteUrls } from "@/config/urls";
import Link from "next/link";
import Wrapper from "react-wrap-balancer";

export default function HomePage() {
    return (
        <main className="container flex flex-col items-center gap-6 py-14">
            <Wrapper
                as="h1"
                className="max-w-3xl text-center text-5xl font-bold leading-tight"
            >
                Generate Prompts for ChatGPT or AI Chatbots
            </Wrapper>
            <Wrapper
                as="p"
                className="max-w-3xl text-center text-lg text-muted-foreground"
            >
                Generate prompts for AI chatbots like ChatGPT, GPT-3, and others
                with a simple and easy-to-use interface. You can generate
                prompts for various use cases like chatbots, creative writing,
                and more.
            </Wrapper>
            <div className="flex items-center gap-3">
                <Link href={siteUrls.app} className={buttonVariants()}>
                    Generate Prompts
                </Link>
                <Link
                    href="/gh"
                    className={buttonVariants({
                        variant: "outline",
                        className: "gap-2",
                    })}
                >
                    <Icons.gitHub className="h-4 w-4" />
                    <span>Github</span>
                </Link>
            </div>
        </main>
    );
}
