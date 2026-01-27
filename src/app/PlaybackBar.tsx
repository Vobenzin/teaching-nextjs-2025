"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function PlaybackBar(){
  const [isPlaying, setIsPlaying ] = useState(false) ;

  const [playTime, setPlayTime] = useState(0) ;


  useEffect(() => {
          console.log("useEffect runs"); 
          
          const interval = setInterval(() => {
              if(isPlaying){
                setPlayTime((playTime) => playTime + 1);
              }
            
          }, 1000);
          return () => clearInterval(interval);
      
        },[isPlaying]);

  function setIsPlayingButton(){
    setIsPlaying(!isPlaying)
  }
  return (
    <>
    <div className="h-24 fixed bottom-0 left-0 right-0 bg-base-100 shadow-sm text-center align-middle">
            <button className="btn btn-xs m-2 mt-3">
      {<FontAwesomeIcon icon={faStepBackward} />}
      </button>
            <button className="btn btn-circle m-2 mt-3" onClick={setIsPlayingButton}>
      {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
      </button>
                  <button className="btn btn-xs m-2 mt-3">
      {<FontAwesomeIcon icon={faStepForward} />}
      </button>
      <div className="flex justify-center m-2">
        <p>{Math.round((playTime/60))}.{playTime%60}</p>
        <input type="range" min={0} max={2.12*60} defaultValue={playTime} className="range range-sm" />
        <p>2.12</p>
      </div>
    
      </div>  

    </>
    
  )
}