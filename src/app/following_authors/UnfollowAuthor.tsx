"use client";

import { unfollowAuthor } from "@/actions/follow";

import { useRef } from "react";

export function UnfollowAuthor(props: {
  author_id: number | null;
}) {

  return (
      <>
            <button
              className="btn btn-xs"
              onClick={() => {
                unfollowAuthor(props.author_id)

              }}
            >
              RemoveFollow
            </button>
      </>

  );
}
