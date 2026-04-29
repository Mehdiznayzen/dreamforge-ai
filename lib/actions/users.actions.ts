"use server";

import { UserProps } from "@/types";
import { db } from "../db";
import { users } from "../db/schema";
import bcrypt from "bcrypt";

export const createUser = async (user: UserProps) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  await db.insert(users).values({
    clerkId: user.clerkId,
    username: user.username,
    email: user.email,
    password: hashedPassword,
  });
};