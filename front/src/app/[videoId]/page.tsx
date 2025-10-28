import { Video } from "@/types/video";
import getVideoById from "@/utils/getVideoById";
import VideoPlayer from "../components/VideoPlayer";

type VideoPageProps = {
  params: {
    videoId: string;
  };
};

export default async function Page({ params }: VideoPageProps) {
  const { videoId } = await params;
  // esse await por algum motivo sem ele o next reclama
  const video: Video | null = await getVideoById(videoId);
  console.log(video);

  const title: string | null =
    video &&
    video.title.slice(0, 1).toUpperCase() +
      video.title.slice(1, video?.description.length);

  const authors: string | null = video && video?.authors.replace(",", ", ");

  const description: string | null =
    video &&
    video.description.slice(0, 1).toUpperCase() +
      video.description.slice(1, video?.description.length);

  return (
    <section className="flex min-h-full w-full flex-col items-center justify-center">
      <article className="bg-card-bg my-3 flex w-[95%] flex-col gap-2 rounded-lg p-3 shadow-md lg:w-4/5 xl:w-[55%]">
        <p className="w-full text-xl font-medium md:text-2xl xl:text-3xl">
          {title}
        </p>
        <article className="w-full">
          <VideoPlayer
            videoUrl={
              video?.url ?? "https://www.youtube.com/watch?v=wzoIZO8WbI8"
            }
            //ending 1 do naruto
          />
        </article>
        <article className="flex w-full flex-col gap-2">
          <div>
            <p className="text-justify text-lg font-medium md:text-xl xl:text-2xl">
              Autores:
            </p>
            <p className="md:text-lg">{authors}</p>
          </div>
          <div>
            <p className="text-lg font-medium md:text-xl xl:text-2xl">
              Descrição:
            </p>
            <p className="text-justify md:text-lg">{description}</p>
          </div>
        </article>
      </article>
    </section>
  );
}
