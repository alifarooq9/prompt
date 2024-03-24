import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { db } from "./db";
import { userTable, sessionTable } from "./db/schema";
import { cache } from "react";
import type { Session, User } from "lucia";
import { cookies } from "next/headers";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            // set to `true` when using HTTPS
            secure: process.env.NODE_ENV === "production",
        },
    },
    getUserAttributes: (attributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
            email: attributes.email,
        };
    },
});

// IMPORTANT!
declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    email: string;
}

export function getSessionId() {
    return cookies().get(lucia.sessionCookieName)?.value ?? null;
}

export const validateAuth = cache(
    async (): Promise<
        { user: User; session: Session } | { user: null; session: null }
    > => {
        const sessionId = getSessionId();

        if (!sessionId) {
            return {
                user: null,
                session: null,
            };
        }

        const result = await lucia.validateSession(sessionId);
        // next.js throws when you attempt to set cookie when rendering page
        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(
                    result.session.id,
                );
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes,
                );
            }
            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes,
                );
            }
        } catch {}
        return result;
    },
);
