import { isFollowingAuthor } from "@/actions/follow";
import { get_id } from "@/actions/login";
import { FollowAuthor } from "@/app/following_authors/FollowAuthor";
import { UnfollowAuthor } from "@/app/following_authors/UnfollowAuthor";
import { getDb } from "@/lib/db";
import Link from "next/link";

export default async function AuthorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const db = getDb();
  const  user_id = await get_id();

  const { id } = await params;

  console.log("Album detail id:", id);

  const authorId = parseInt(id);

  if (isNaN(authorId)) {
    return <div>Invalid Album id</div>;
  }

  const author = await db
    .selectFrom("authors")
    .selectAll()
    .where("id", "=", authorId)
    .executeTakeFirst();

  if (author == null) {
    return <div>Author not found</div>;
  }

  const albums = await db
    .selectFrom("albums")
    .selectAll()
    .where("author_id", "=", author.id)
    .execute();

  const follow_author_list = await db
    .selectFrom("following_authors")
    .selectAll()
    .where("author_id", "=", author.id)
    .where("user_id", "=", user_id)
    .execute();
  
    console.log(follow_author_list)

  return (
    <>
        <p className="text-2xl font-bold">Name: {author.name}</p>
        {follow_author_list.length != 0 ? (<UnfollowAuthor author_id={author.id}></UnfollowAuthor>) : (<FollowAuthor author_id={author.id}></FollowAuthor>)}
        
        
        <p className="text-2l font-bold">Bio: {author.bio}</p>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>

          </thead>
          <tbody>

          
          {albums.map((album) => (
            <tr className="list-disc" key={album.id}>
              <td><Link href={`/album/${album.id}`}>{album.name}</Link></td>
            </tr>
          ))}
          </tbody>
        </table>
    </>
  );
}
