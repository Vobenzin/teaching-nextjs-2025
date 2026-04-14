"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { get_id } from "./login";
import { fa } from "@faker-js/faker";




export async function isFollowingAuthor(author_id: number) {
  const db = getDb();
  const user_id = await get_id();
  const alreadyIn = db
    .selectFrom("following_authors")
    .where("user_id", "=", user_id)
    .where("author_id", "=", author_id)
    .executeTakeFirstOrThrow()
  console.log(alreadyIn, user_id, author_id)
  return alreadyIn

}

export async function followAuthor(
  author_id: number | null ) {
  if (author_id == null){return null}
  const db = getDb();
  const user_id = await get_id();
  await db
    .insertInto("following_authors")
    .values({
      user_id: user_id,
      author_id: author_id
    })
    .execute();

  revalidatePath("/");
}

export async function unfollowAuthor(
  author_id: number | null
) {
  console.log(`Removing Like from song ${author_id}`);
  const db = getDb();
  const user_id = await get_id();
  await db
    .deleteFrom("following_authors")
    .where("user_id", "=", user_id)
    .where("author_id", "=", author_id)
    .execute();

  revalidatePath("/");
}