"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function likeSong(songId: number) {
  const db = getDb();

  // const alreadyIn = await db
  //   .selectFrom("user_liked_songs")
  //   .where("user_id", "=", 1)
  //   .where("song_id", "=", songId)
  //   .executeTakeFirst();
  // if (alreadyIn != undefined){
  //   return
  // }
  await db
    .insertInto("user_liked_songs")
    .values({
      user_id: 1,
      song_id: songId,
    })
    .execute();

  revalidatePath("/");
}

export async function removeLikeFromSong(
  songId: number | null
) {
  console.log(`Removing Like from song ${songId}`);
  const db = getDb();

  await db
    .deleteFrom("user_liked_songs")
    .where("user_id", "=", 1)
    .where("song_id", "=", songId)
    .execute();

  revalidatePath("/");
}