import Image from "next/image";
import Link from "next/link";
import VideoThumbnail from "./VideoThumbnail";

type MainVideoCardProps = {
  videoTitle: string;
  videoAuthors: string;
  videoId: string;
};
const MainVideo = ({
  videoTitle,
  videoAuthors,
  videoId,
}: MainVideoCardProps) => {
  return (
    <section className="bg-card-bg flex flex-col items-center gap-2 rounded-xl p-3 shadow-md">
      <article className="relative aspect-video w-full overflow-hidden rounded-md">
        <VideoThumbnail videoId={videoId} altText={videoTitle} key={videoId} />

        <Link
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent"
          href={videoId}
        >
          <Image
            src={"/highlight-blue-play-btn.png"}
            height={20}
            width={20}
            alt="play-btn"
          />
        </Link>
      </article>

      <article className="w-full">
        <p className="text-primary-text text-xl font-medium">{videoTitle}</p>
        <p className="text-secondary-text text-sm">
          {videoAuthors.replace(",", ", ")}
        </p>
      </article>
    </section>
  );
};
export default MainVideo;
