"use server";

import { db } from "@/server/db";
import { generateId } from "lucia";
import { userTable } from "@/server/db/schema";
import * as argon2 from "argon2";
import { eq } from "drizzle-orm";

interface CreateUserProps {
    email: string;
    password: string;
}

type CreateUserResult =
    | { success: true; userId: string }
    | { success: false; error: string };

export async function createUser(
    data: CreateUserProps,
): Promise<CreateUserResult> {
    const hashedPassword = await argon2.hash(data.password);
    const userId = generateId(15);

    const isUserExists = await db.query.userTable.findFirst({
        where: eq(userTable.email, data.email),
    });

    if (isUserExists) {
        return {
            success: false,
            error: "User already exists",
        };
    }

    await db
        .insert(userTable)
        .values({
            id: userId,
            email: data.email,
            hashedPassword: hashedPassword,
        })
        .execute();

    return { userId, success: true };
}
