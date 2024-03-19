import { siteUrls } from "@/config/urls";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AppHeader() {
  return (
    <header className="container flex h-20 items-center justify-between">
      <Link href={siteUrls.home} className="text-2xl font-bold">
        Prompt.
      </Link>
      <div className="divide-border flex items-center divide-x">
        <section className="flex items-center gap-2 pr-2">
          <ThemeToggle />
        </section>
        <section className="flex items-center gap-2 pl-2">
          <Button variant="ghost" size="sm">
            Log In
          </Button>
          <Button size="sm" className="gap-1">
            <span>Sign Up</span>
            <span className="font-light">-</span>
            <span className="font-light">it&apos;s free</span>
          </Button>
        </section>
      </div>
    </header>
  );
}
