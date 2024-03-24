import { siteUrls } from "@/config/urls";
import { validateAuth } from "@/server/auth";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
    const { user } = await validateAuth();

    if (user) {
        return redirect(siteUrls.app);
    }

    return <>{children}</>;
}
