"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export function NavBar() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  console.log("NavBar render searchInput:", searchInput);

  const searchLinkQuery = searchInput !== "" ? { q: searchInput } : {};

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <details className="dropdown">
          <summary>
            =
          </summary>
        
          
          <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li><Link href="/playlists" className="btn btn-ghost text-xl">
              Playlists
            </Link>
            </li>
            <li><Link href="/liked_songs" className="btn btn-ghost text-xl">
              LikedSongs
            </Link ></li>
            <li><Link href="/history" className="btn btn-ghost text-xl">
            History
            </Link>
            </li>
            <li>
            <Link href="/following_authors" className="btn btn-ghost text-xl">
            FollowAuthors
            </Link>
            </li>
          </ul>
        </details>
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Spotify
        </Link>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          onKeyUp={(e) => {
            console.log("key pressed:", e.key);
            if (e.key === 'Enter') {
              // TODO - add proper code and sanitization
              router.push(`/search?q=${searchInput}`)
            }
          }}
        />
        <Link
          href={{
            pathname: "/search",
            query: searchLinkQuery,
          }}
          className="btn btn-ghost text-xl"
        >
          Search
        </Link>

      </div>
    </div>
  );
}
