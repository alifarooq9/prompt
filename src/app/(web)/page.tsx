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
                className="text-center text-6xl font-bold leading-tight text-muted-foreground"
            >
                Generate <span className="text-foreground">Prompts</span> for
                ChatGPT or AI Chatbots
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
