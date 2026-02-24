"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { get_id } from "./login";
export async function toggleStart(song_id: number) {

  const db = getDb();
  const user_id = await get_id()

  const newEvent = await db
    .insertInto("playback_events")
    .values({
      event_name: "playback_start",
      event_data: Date.now(),
      user_id: user_id,
      song_id: song_id
    })
    .returningAll()
    .executeTakeFirstOrThrow();
  revalidatePath("/history");
}


export async function toggleSkip(song_id: number) {

  const db = getDb();
  const user_id = await get_id()
  const newEvent = await db
    .insertInto("playback_events")
    .values({
      event_name: "playback_skip",
      event_data: Date.now(),
      user_id: user_id,
      song_id: song_id
    })
    .returningAll()
    .executeTakeFirstOrThrow();
  revalidatePath("/history");
}


export async function toggleEnd(song_id: number) {

  const db = getDb();
  const user_id = await get_id()
  const newEvent = await db
    .insertInto("playback_events")
    .values({
      event_name: "playback_end",
      event_data: Date.now(),
      user_id: user_id,
      song_id: song_id
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  revalidatePath("/history");
}