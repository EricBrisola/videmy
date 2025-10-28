import Image from "next/image";
import Link from "next/link";
import VideoThumbnail from "./VideoThumbnail";

type VideoCardProps = {
  videoPath: string;
  videoTitle: string;
  videoAuthors: string;
  videoId: string;
};

const VideoCard = ({
  videoPath,
  videoTitle,
  videoAuthors,
  videoId,
}: VideoCardProps) => {
  return (
    <section className="bg-card-bg flex w-full flex-col items-center gap-2 rounded-xl p-3 shadow-md">
      <Link
        href={videoPath}
        className="relative aspect-video w-full overflow-hidden rounded-md"
      >
        <VideoThumbnail videoId={videoId} altText={videoTitle} key={videoId} />
        <div className="absolute top-1/2 left-1/2 flex aspect-square -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <Image
            src={"/highlight-blue-play-btn.png"}
            width={512}
            height={512}
            sizes="(min-width: 640px) 40px, 
                  (min-width: 425px) 32px, 
                  (min-width: 375px) 40px, 
                  36px"
            alt="play-btn"
            className="w-9 min-[375px]:w-10 min-[425px]:w-8 sm:w-10"
          />
        </div>
      </Link>

      <article className="w-full">
        <p className="text-primary-text text-xl font-medium">{videoTitle}</p>
        <p className="text-secondary-text text-sm min-[425px]:text-base">
          {videoAuthors.replace(",", ", ")}
        </p>
      </article>
    </section>
  );
};
export default VideoCard;
