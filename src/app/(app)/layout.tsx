import { AppHeader } from "@/components/header";
import { Fragment, type ReactNode } from "react";
import { siteUrls } from "@/config/urls";
import { validateAuth } from "@/server/auth";
import { redirect } from "next/navigation";

interface AppLayoutProps {
    children: ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
    const { user } = await validateAuth();

    if (!user) {
        return redirect(siteUrls.signin);
    }

    return (
        <Fragment>
            <AppHeader />
            {children}
        </Fragment>
    );
}
