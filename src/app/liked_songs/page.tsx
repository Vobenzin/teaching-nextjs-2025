import { getDb } from "@/lib/db";
import Link from "next/link";
import { RemoveLikeFromSong } from "./RemoveLikeFromSong";


export default async function PlaylistsPage() {
  const db = getDb();

  const liked_songs = await db
    .selectFrom("user_liked_songs")    
    .innerJoin("songs", "user_liked_songs.song_id", "songs.id")
    .innerJoin("albums", "songs.album_id", "albums.id")
    .innerJoin("authors", "albums.author_id", "authors.id")
    .select([
      "user_liked_songs.id",
      "user_liked_songs.user_id",
      "songs.id as song_id",
      "songs.name",
      "albums.name as album_name",
      "authors.name as author_name",
    ])
    .where("user_id", "=", 1)
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p className="text-2xl font-bold">Playlists</p>
        <table className="table">
          <thead>
            <tr>
              <th>IdS.</th>
              <th>Song</th>

              <th>Album</th>

              <th>Author</th>
              <th>Like</th>
            </tr>

          </thead>
          <tbody>

          
          {liked_songs.map((liked_songs) => (
            <tr className="list-disc" key={liked_songs.id}>
              <td>{liked_songs.song_id}</td>
              <td>{liked_songs.name}</td>
              <td>{liked_songs.album_name}</td>
              <td>{liked_songs.author_name} </td>
              <td><RemoveLikeFromSong songId = {liked_songs.song_id}></RemoveLikeFromSong></td>
            </tr>
          ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
