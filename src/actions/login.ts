"use server";

import { getDb } from "@/lib/db";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'

export async function LoginValidation(email: string, password:string) {

  const db = getDb();
  const cookieStore = await cookies()

  const user = await db
    .selectFrom("users")
    .where("users.email","=",email)
    .where("users.password","=", password)
    .selectAll()
    .executeTakeFirstOrThrow();

  cookieStore.set("user_id",user.id.toString())
  console.log("HELP")
  redirect(`/`);
}

export async function get_id() {
  const cookieStore = await cookies()
  const user_id = cookieStore.get("user_id")?.value
  if (user_id != undefined){
    return parseInt(user_id)
  }
  return 0
}