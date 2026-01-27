import { getDb } from "@/lib/db";
import Link from "next/link";
import { CreatePlaylistButton } from "./CreatePlaylistButton";

export default async function PlaylistsPage() {
  const db = getDb();

  const playlists = await db
    .selectFrom("playlists")
    .selectAll()
    .where("user_id", "=", 1)
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
