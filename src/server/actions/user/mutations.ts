"use server";

import { db } from "@/server/db";
import { generateId } from "lucia";
import { userTable } from "@/server/db/schema";
import { lucia } from "@/server/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as argon2 from "argon2";
import { eq } from "drizzle-orm";
import { siteUrls } from "@/config/urls";

interface SignDataProps {
    username: string;
    password: string;
}

export async function createUserMutation(data: SignDataProps) {
    const hashedPassword = await argon2.hash(data.password);
    const userId = generateId(15);

    const isUserExists = await db
        .select()
        .from(userTable)
        .where(eq(userTable.username, data.username))
        .execute();

    if (isUserExists.length) {
        throw new Error("User already exists");
    }

    await db
        .insert(userTable)
        .values({
            id: userId,
            username: data.username,
            hashedPassword: hashedPassword,
        })
        .execute();

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );

    return redirect(siteUrls.app);
}
