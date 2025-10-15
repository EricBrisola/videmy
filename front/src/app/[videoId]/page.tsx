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

  return (
    <section className="flex min-h-full w-full flex-col items-center justify-center gap-7">
      <article className="bg-card-bg flex w-[95%] flex-col gap-2 rounded-lg p-3 shadow-md">
        <p className="w-full text-xl font-medium">{video?.title}</p>
        <article className="w-full">
          <VideoPlayer
            videoUrl={
              video?.url ?? "https://www.youtube.com/watch?v=wzoIZO8WbI8"
            }
            //ending 1 do naruto
          />
        </article>
        <article className="flex w-full flex-col gap-2">
          <div className="">
            <p className="text-justify text-lg font-medium">Autores:</p>
            <p>{video?.authors.replace(",", ", ")}</p>
          </div>
          <div className="">
            <p className="text-lg font-medium">Descrição:</p>
            <p className="text-justify">{video?.description}</p>
          </div>
        </article>
      </article>
    </section>
  );
}
