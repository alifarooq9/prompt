// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import {
    integer,
    sqliteTableCreator,
    text,
    uniqueIndex,
} from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `prompt_${name}`);

export const userTable = createTable(
    "user",
    {
        id: text("id").notNull().primaryKey(),
        email: text("email").notNull().unique(),
        hashedPassword: text("hashed_password").notNull(),
    },
    (u) => ({
        emailIdx: uniqueIndex("email_idx").on(u.email),
    }),
);

export const sessionTable = createTable("session", {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    expiresAt: integer("expires_at").notNull(),
});
