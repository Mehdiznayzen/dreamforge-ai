import { pgTable, text, uuid, timestamp, boolean } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkId: text("clerk_id").notNull(),
    username: text("username").notNull(),
    email: text("email").notNull(),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const images = pgTable("images", {
    id: uuid("id").defaultRandom().primaryKey(),
    url: text("url").notNull(),
    prompt: text("prompt").notNull(),
    liked: boolean("liked").default(false),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})