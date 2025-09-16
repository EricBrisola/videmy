import Image from "next/image";
import Link from "next/link";

const MainVideo = () => {
  return (
    <section className="bg-card-bg flex flex-col items-center gap-2 rounded-xl p-3 shadow-md">
      <article className="relative aspect-video w-full overflow-hidden rounded-md">
        <Image
          src={"/thumbnailTest.jpg"}
          alt="video-thumbnail"
          fill
          className="object-cover"
        />

        <Link
          className="bg-main-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-4"
          href={"/"}
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
        <p className="text-primary-text text-xl font-medium">Titulo</p>
        <p className="text-secondary-text text-sm">Dono do video</p>
      </article>
    </section>
  );
};
export default MainVideo;
