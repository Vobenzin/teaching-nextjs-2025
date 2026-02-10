import { getDb } from "@/lib/db";


export default async function PlaylistsPage() {
  const db = getDb();
  
  const playback_events = await db
    .selectFrom("playback_events")    
    .innerJoin("songs", "playback_events.song_id", "songs.id")
    .innerJoin("albums", "songs.album_id", "albums.id")
    .innerJoin("authors", "albums.author_id", "authors.id")
    .select([
      "playback_events.id",
      "playback_events.user_id",
      "playback_events.event_name",
      "playback_events.event_data",
      "songs.id as song_id",
      "songs.name",
      "albums.name as album_name",
      "authors.name as author_name",
    ])
    .where("user_id", "=", 1)
    .execute();
  return (
    <>
        <p className="text-2xl font-bold">Playback History</p>
        <table className="table">
          <thead>
            <tr>
              <th>IdS.</th>
              <th>Ev. Name</th>
              <th>Ev. Date</th>
              <th>Song</th>
              <th>Album</th>
              <th>Author</th>
            </tr>

          </thead>
          <tbody>


          {playback_events.map((playback_event) => (
            
            <tr className="list-disc" key={playback_event.id}>
              <td>{playback_event.id}</td>
              <td>{playback_event.event_name}</td>
              
              <td>{playback_event.event_data != null ? new Date(playback_event.event_data).toDateString() : "--"}</td>
              <td>{playback_event.name}</td>
              <td>{playback_event.album_name}</td>
              <td>{playback_event.author_name} </td>
            </tr>
          ))}
          </tbody>
        </table>
    </>
  );
}
