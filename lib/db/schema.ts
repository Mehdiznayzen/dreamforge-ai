import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkId: text("clerk_id").notNull(),
    username: text("username").notNull(),
    email: text("email").notNull(),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});