"use server";

import { db } from "../db";
import { images, users } from "../db/schema";
import { ImageProps } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createImage = async (image: ImageProps) => {
  try {
    // 🔥 chercher user dans DB avec clerkId
    const dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, image.userId),
    });

    if (!dbUser) {
      throw new Error("User not found in DB");
    }

    const newImage = await db
      .insert(images)
      .values({
        url: image.url,
        prompt: image.prompt,
        userId: dbUser.id,
      })
      .returning();

    revalidatePath("/dashboard");

    return newImage;
  } catch (error) {
    console.error("CREATE IMAGE ERROR:", error);
    throw error;
  }
};

export const getUserImages = async (clerkId: string) => {
  try {
    if (!clerkId) {
      throw new Error("User not authenticated");
    }

    const dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
    });

    if (!dbUser) {
      throw new Error("User not found");
    }

    const userImages = await db.query.images.findMany({
      where: eq(images.userId, dbUser.id), 
    });

    return userImages;
  } catch (error) {
    console.error("GET IMAGES ERROR:", error);
    throw error;
  }
};