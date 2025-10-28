import Image from "next/image";
import Link from "next/link";
import VideoThumbnail from "./VideoThumbnail";

type MainVideoCardProps = {
  videoTitle: string;
  videoAuthors: string;
  videoId: string;
  VideoDescription: string;
};
const MainVideoDesktopVersion = ({
  videoTitle,
  videoAuthors,
  videoId,
  VideoDescription,
}: MainVideoCardProps) => {
  return (
    <section className="bg-card-bg flex w-full items-center gap-4 rounded-xl p-3 shadow-md max-[1024px]:hidden lg:w-[90%] xl:w-4/5">
      <Link
        href={videoId}
        className="relative aspect-video w-full overflow-hidden rounded-md"
      >
        <VideoThumbnail videoId={videoId} altText={videoTitle} key={videoId} />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent">
          <Image
            src={"/white-play-btn.png"}
            width={512}
            height={512}
            sizes="(min-width: 1280px) 56px, (min-width: 1024px) 48px, 40px"
            alt="play-btn"
            className="lg:w-12 xl:w-14"
          />
        </div>
      </Link>

      <article className="flex w-full flex-col gap-2">
        <p className="text-primary-text mb-3 text-3xl font-semibold">
          {videoTitle}
        </p>
        <p className="text-secondary-text text-xl">
          {videoAuthors.replace(",", ", ")}
        </p>
        <p className="text-base text-gray-800">
          {VideoDescription.slice(0, 1) +
            VideoDescription.slice(1, VideoDescription.length)}
        </p>
      </article>
    </section>
  );
};
export default MainVideoDesktopVersion;
