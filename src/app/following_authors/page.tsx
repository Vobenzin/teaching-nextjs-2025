import { getDb } from "@/lib/db";
// import { RemoveLikeFromSong } from "./RemoveLikeFromSong";
import { get_id } from "@/actions/login";
import { UnfollowAuthor } from "./UnfollowAuthor";
import Link from "next/link";


export default async function FollowingAuthorsPage() {
  const db = getDb();
  const  user_id = await get_id();

  const following_authors = await db
    .selectFrom("following_authors")    
    .innerJoin("authors", "following_authors.author_id", "authors.id")

    .select([
      "following_authors.id",
      "following_authors.user_id",
      "following_authors.author_id",
      "authors.name as author_name",
    ])
    .where("user_id", "=", user_id)
    .execute();

  return (
    <>
        <p className="text-2xl font-bold">Following Authors</p>
        <table className="table">
          <thead>
            <tr>
              <th>IdS.</th>
              <th>Author</th>
              <th>Unfollow</th>
            </tr>

          </thead>
          <tbody>

          
          {following_authors.map((author) => (
            <tr className="list-disc" key={author.id}>
              <td>{author.id}</td>
              <td><Link href={`author/${author.author_id}`}>{author.author_name}</Link></td>

              <td><UnfollowAuthor author_id={author.author_id}></UnfollowAuthor></td>
            </tr>
          ))}
          </tbody>
        </table>
    </>
  );
}
