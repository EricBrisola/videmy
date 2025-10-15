"use client";
import ReactPlayer from "react-player";

type VideoPlayerProps = {
  videoUrl: string;
};

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  return (
    <article className="aspect-video overflow-hidden rounded-md">
      <ReactPlayer
        src={videoUrl}
        muted={true}
        controls={true}
        width="100%"
        height="100%"
      />
    </article>
  );
};

export default VideoPlayer;
