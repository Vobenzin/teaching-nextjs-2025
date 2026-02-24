import { getDb } from "@/lib/db";
import Link from "next/link";
import { CreatePlaylistButton } from "./CreatePlaylistButton";
import { get_id } from "@/actions/login";

export default async function PlaylistsPage() {
  const db = getDb();
  const user_id = await get_id();

  const playlists = await db
    .selectFrom("playlists")
    .selectAll()
    .where("user_id", "=", user_id)
    .execute();

  return (
    <>
        <p className="text-2xl font-bold">Playlists</p>
        <CreatePlaylistButton />
        <ul>
          {playlists.map((playlist) => (
            <li className="list-disc" key={playlist.id}>
              <Link href={`/playlist/${playlist.id}`}>{playlist.name}</Link>
            </li>
          ))}
        </ul>
    </>
  );
}
