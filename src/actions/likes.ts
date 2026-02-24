"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { get_id } from "./login";


export async function likeSong(songId: number) {
  const db = getDb();
  const user_id = await get_id();
  await db
    .insertInto("user_liked_songs")
    .values({
      user_id: user_id,
      song_id: songId,
    })
    .execute();

  revalidatePath("/");
}

export async function isLikeSong(songId: number) {
  const db = getDb();
  const user_id = await get_id();
  const alreadyIn = await db
    .selectFrom("user_liked_songs")
    .where("user_id", "=", user_id)
    .where("song_id", "=", songId)
    .executeTakeFirst();

  return alreadyIn != undefined ? true : false

}

export async function removeLikeFromSong(
  songId: number | null
) {
  console.log(`Removing Like from song ${songId}`);
  const db = getDb();
  const user_id = await get_id();
  await db
    .deleteFrom("user_liked_songs")
    .where("user_id", "=", user_id)
    .where("song_id", "=", songId)
    .execute();

  revalidatePath("/");
}