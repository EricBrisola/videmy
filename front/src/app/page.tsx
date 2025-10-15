import getVideos from "@/utils/getVideos";
import MainVideo from "./components/MainVideo";
import VideoCard from "./components/VideoCard";
import { Metadata } from "next";
import { Video } from "@/types/video";

export const metadata: Metadata = {
  title: "Videmy | Home",
  description: "Página principal",
};

export default async function Home() {
  const videos = await getVideos();

  const mainVideo: Video | undefined = videos?.find(
    (video) =>
      video.title.toLowerCase() == "docker" && video.authors.includes("Eric"),
  );

  return (
    <div className="flex min-h-full w-full flex-col gap-3 p-2">
      {mainVideo && (
        <MainVideo
          key={mainVideo.id}
          videoTitle={mainVideo.title}
          videoAuthors={mainVideo.authors}
          videoId={mainVideo.id}
        />
      )}

      <section className="bg-card-bg rounded-xl">
        <p className="text-primary-text py-3 pl-3 text-xl font-medium">
          Demais tutoriais
        </p>
        <article className="grid grid-cols-2 gap-2 pb-3">
          {videos && videos?.length >= 1 ? (
            videos?.map((video: Video) => {
              return (
                <VideoCard
                  key={video.id}
                  videoId={video.id}
                  videoPath={video.id}
                  videoTitle={video.title}
                  videoAuthors={video.authors}
                />
              );
            })
          ) : (
            <p>Sem vídeos</p>
          )}
        </article>
      </section>
    </div>
  );
}
