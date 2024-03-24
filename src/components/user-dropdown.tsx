"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {} from "@radix-ui/react-icons";
import { CircleUserRound, LogOutIcon, TerminalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteUrls } from "@/config/urls";
import type { User } from "lucia";
import { useMutation } from "@tanstack/react-query";
import { signout } from "@/server/actions/auth";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Icons } from "./ui/icons";
import { useState } from "react";
import { toast } from "sonner";

interface UserDropdownProps {
    user: User | null;
}

export function UserDropdown({ user }: UserDropdownProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { isPending, mutateAsync } = useMutation({
        mutationFn: () => signout(),
        onSettled: () => {
            setIsOpen(false);
        },
    });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await mutateAsync();

        if (result?.error) {
            return toast.error(
                result.error ?? "An error occurred. Please try again.",
            );
        }

        toast.success("You have been signed out.");
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={(o) => setIsOpen(o)}>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <CircleUserRound className="h-5 w-5" strokeWidth={1} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[250px]">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="px-2 py-1">
                        <p className="truncate text-sm font-medium">
                            {user?.email}
                        </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <Link href={siteUrls.app}>
                                <TerminalIcon className="mr-2 h-4 w-4" />
                                <span>Generate Prompts</span>
                                <DropdownMenuShortcut>⇧⌘G</DropdownMenuShortcut>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />

                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem>
                            <LogOutIcon className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogContent asChild>
                <form onSubmit={onSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to sign out?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            You will be sign out of your account, and will be
                            redirected to the home page. Are you sure you want
                            to continue?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>
                            Cancel
                        </AlertDialogCancel>
                        <Button disabled={isPending}>
                            {isPending ? (
                                <Icons.spinner className="mr-2 h-4 w-4" />
                            ) : null}
                            <span>Sign Out</span>
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
