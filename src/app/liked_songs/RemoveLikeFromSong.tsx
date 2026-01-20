"use client";

import { likeSong, removeLikeFromSong } from "@/actions/likes";
import { useRef } from "react";

export function RemoveLikeFromSong(props: {
  songId: number | null;
}) {

  return (
      <>
            <button
              className="btn btn-xs"
              onClick={() => {
                removeLikeFromSong(props.songId);

              }}
            >
              Remove
            </button>
      </>

  );
}
