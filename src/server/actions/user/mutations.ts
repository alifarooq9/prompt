"use server";

import { db } from "@/server/db";
import { generateId } from "lucia";
import { userTable } from "@/server/db/schema";
import { lucia } from "@/server/auth";
import { cookies } from "next/headers";
import * as argon2 from "argon2";
import { eq } from "drizzle-orm";

interface CreateUserMutationsProps {
    email: string;
    password: string;
}

export async function createUserMutation(data: CreateUserMutationsProps) {
    const hashedPassword = await argon2.hash(data.password);
    const userId = generateId(15);

    const isUserExists = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, data.email))
        .execute();

    if (isUserExists.length) {
        throw new Error("User already exists");
    }

    await db
        .insert(userTable)
        .values({
            id: userId,
            email: data.email,
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

    return { userId };
}
