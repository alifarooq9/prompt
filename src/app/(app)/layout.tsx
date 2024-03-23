import { AppHeader } from "@/components/header";
import { Fragment, type ReactNode } from "react";

interface WebLayoutProps {
    children: ReactNode;
}

export default function WebLayout({ children }: WebLayoutProps) {
    return (
        <Fragment>
            <AppHeader />
            {children}
        </Fragment>
    );
}
