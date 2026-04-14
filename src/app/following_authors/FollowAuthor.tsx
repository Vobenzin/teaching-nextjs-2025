"use client";

import { followAuthor } from "@/actions/follow";


export function FollowAuthor(props: {
  author_id: number | null;
}) {

  return (
      <>
            <button
              className="btn btn-xs"
              onClick={() => {
                followAuthor(props.author_id)

              }}
            >
              Follow
            </button>
      </>

  );
}