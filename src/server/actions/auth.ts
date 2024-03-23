"use server";

import { siteUrls } from "@/config/urls";
import { createUser } from "@/server/actions/user";
import { redirect } from "next/navigation";
import { getServerSession, lucia } from "@/server/auth";
import { cookies } from "next/headers";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { userTable } from "@/server/db/schema";
import * as argon2 from "argon2";

interface SigninProps {
    email: string;
    password: string;
}

export async function signup(data: SigninProps) {
    const handleCreateUser = await createUser({
        email: data.email,
        password: data.password,
    });

    if (handleCreateUser.success === false) {
        return {
            error: handleCreateUser.error,
        };
    }

    const session = await lucia.createSession(handleCreateUser.userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );

    return redirect(siteUrls.app);
}

interface SigninProps {
    email: string;
    password: string;
}

export async function signin(data: SigninProps) {
    const isUserExists = await db.query.userTable.findFirst({
        where: eq(userTable.email, data.email),
    });

    if (!isUserExists) {
        return {
            error: "Incorrect email or password",
        };
    }

    const validPassword = await argon2.verify(
        isUserExists.hashedPassword,
        data.password,
    );

    if (!validPassword) {
        return {
            error: "Incorrect email or password",
        };
    }

    const session = await lucia.createSession(isUserExists.id, {});
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
