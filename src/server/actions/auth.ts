"use server";

import { siteUrls } from "@/config/urls";
import { createUserMutation } from "@/server/actions/user";
import { redirect } from "next/navigation";
import { getServerSession, lucia } from "@/server/auth";
import { cookies } from "next/headers";

interface SignupMutationProps {
    email: string;
    password: string;
}

export async function signup(data: SignupMutationProps) {
    const { userId } = await createUserMutation({
        email: data.email,
        password: data.password,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );

    return redirect(siteUrls.app);
}

export async function signout() {
    const { session } = await getServerSession();
    if (!session) {
        return {
            error: "Unauthorized",
        };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );

    return redirect(siteUrls.home);
}
