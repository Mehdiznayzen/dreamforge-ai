"use server";

import { UserProps } from "@/types";
import { db } from "../db";
import { users } from "../db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export const createUser = async (user: UserProps) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const userExists = await db
    .select()
    .from(users)
    .where(eq(users.email, user.email));

  if (userExists.length > 0) {
    return;
  }

  await db.insert(users).values({
    clerkId: user.clerkId,
    username: user.username,
    email: user.email,
    password: hashedPassword,
  });
};