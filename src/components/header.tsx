import { siteUrls } from "@/config/urls";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { getServerSession } from "@/server/auth";
import { Suspense } from "react";
import { UserDropdown } from "@/components/user-dropdown";

export function WebHeader() {
    return (
        <header className="container flex h-20 items-center justify-between">
            <Link href={siteUrls.home} className="text-2xl font-bold">
                Prompt.
            </Link>
            <div className="flex items-center divide-x divide-border">
                <section className="flex items-center gap-2 pr-2">
                    <ThemeToggle />
                </section>

                <Suspense fallback={null}>
                    <WebHeaderAuth />
                </Suspense>
            </div>
        </header>
    );
}

async function WebHeaderAuth() {
    const { user } = await getServerSession();

    return (
        <section className="flex items-center gap-2 pl-2">
            {user ? (
                <Link
                    href={siteUrls.app}
                    className={buttonVariants({
                        size: "sm",
                        className: "gap-1",
                    })}
                >
                    <span>Generate Prompt</span>
                </Link>
            ) : (
                <>
                    <Link
                        href={siteUrls.signin}
                        className={buttonVariants({
                            size: "sm",
                            variant: "ghost",
                        })}
                    >
                        <span>Sign In</span>
                    </Link>
                    <Link
                        href={siteUrls.signup}
                        className={buttonVariants({
                            size: "sm",
                            className: "gap-1",
                        })}
                    >
                        <span>Sign Up</span>
                        <span className="font-light">-</span>
                        <span className="font-light">it&apos;s free</span>
                    </Link>
                </>
            )}
        </section>
    );
}

export async function AppHeader() {
    const { user } = await getServerSession();

    return (
        <header className="container flex h-20 items-center justify-between">
            <Link href={siteUrls.home} className="text-2xl font-bold">
                Prompt.
            </Link>
            <div className="flex items-center divide-x divide-border">
                <section className="flex items-center gap-2 pr-2">
                    <ThemeToggle />
                </section>

                <section className="flex items-center gap-2 pl-2">
                    <UserDropdown user={user} />
                </section>
            </div>
        </header>
    );
}
