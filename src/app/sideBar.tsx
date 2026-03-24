"use client";

import { useContext } from "react";
import { PlaybackContext } from "./playback-context";

export function SideBar() {
  const { currentSong, queue, shuffleOrder, shufflePosition, isShuffled, currentSongIndex, isRepeat} = useContext(PlaybackContext);
  const currentPosition = isShuffled ? shufflePosition : 0
  const id = currentSongIndex
  return (
    <div>
      SideBar Inner:
      <div>currentSong: {currentSong?.name}</div>
      <br />
      <div>
        Song Queue:
          
          {isShuffled==false && queue!= null ? (queue.map((queue_song) => {
            if (id!= null && id < queue.indexOf(queue_song)){
              return ( <ul className="list-disc" key={queue_song.id}>
              <li>{queue_song.name}{queue_song.author}</li>
              <br></br>

            </ul>)
            }
          })) : null}

          {isShuffled==false && queue!= null ? (queue.map((queue_song) => {
            if (id!= null && id > queue.indexOf(queue_song)){
              return ( <ul className="list-disc" key={queue_song.id}>
              <li>{queue_song.name}{queue_song.author}</li>
              <br></br>

            </ul>)
            }
          })) : null}

          {queue!= null && shuffleOrder!= null && isShuffled ? (shuffleOrder.slice(shufflePosition).map((shuffleOrder_num) => {
            const queue_song = queue[shuffleOrder_num]
            if( queue_song != currentSong){
              return ( <ul className="list-disc" key={queue_song.id}>
              <li>{queue_song.name}{queue_song.author}</li>
              <br></br>

            </ul>)
            }
          })) : null}

          {queue!= null && shuffleOrder!= null && isShuffled ? (shuffleOrder.slice(0,shufflePosition).map((shuffleOrder_num) => {
            const queue_song = queue[shuffleOrder_num]
            if( queue_song != currentSong){
              return ( <ul className="list-disc" key={queue_song.id}>
              <li>{queue_song.name}{queue_song.author}</li>
              <br></br>

            </ul>)
            }
          })) : null}
      </div>
    </div>
  );
}
