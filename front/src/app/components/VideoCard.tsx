import Image from "next/image";
import Link from "next/link";

const VideoCard = () => {
  return (
    <section className="bg-card-bg flex w-full flex-col items-center gap-2 rounded-xl p-3 shadow-md">
      <article className="relative aspect-video w-full overflow-hidden rounded-md">
        <Image
          src={"/thumbnailTest.jpg"}
          alt="video-thumbnail"
          fill
          className="object-cover"
        />

        <Link
          className="bg-highlight-blue absolute top-1/2 left-1/2 flex aspect-square w-1/4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
          href={"/"}
        >
          <Image
            src={"/white-play-btn.png"}
            width={15}
            height={15}
            alt="play-btn"
          />
        </Link>
      </article>

      <article className="w-full">
        <p className="text-primary-text text-xl font-medium">Titulo</p>
        <p className="text-secondary-text text-sm">Dono do video</p>
      </article>
    </section>
  );
};
export default VideoCard;
