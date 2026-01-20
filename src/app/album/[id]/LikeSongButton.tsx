"use client";

import { likeSong } from "@/actions/likes";
import { useRef } from "react";

export function LikeSongButton(props: {
  songId: number;
}) {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  return (
      <>
            <button
              className="btn btn-xs"
              onClick={() => {
                likeSong(props.songId);

              }}
            >
              Like
            </button>
      </>

  );
}
