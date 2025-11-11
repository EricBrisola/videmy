import getVideos from "@/utils/getVideos";
import MainVideo from "./components/MainVideo";
import VideoCard from "./components/VideoCard";
import { Metadata } from "next";
import { Video } from "@/types/video";
import MainVideoDesktopVersion from "./components/MainVideoDesktopVersion";

export const metadata: Metadata = {
  title: "Videmy | Home",
  description: "Página principal",
};

export default async function Home() {
  const videos = await getVideos();

  const mainVideo: Video | undefined = videos?.find(
    (video) =>
      video.title.toLowerCase().includes("docker") &&
      video.authors.toLowerCase().includes("eric coca"),
  );

  const otherVideos: Video[] | undefined = videos?.filter(
    (video) =>
      !video.title.toLowerCase().includes("docker") &&
      !video.authors.toLowerCase().includes("Eric Coca"),
  );

  return (
    <div className="flex min-h-full w-full flex-col gap-3 p-2">
      <section className="flex items-center justify-center">
        {/* desaparecer em 1024px */}
        {mainVideo && (
          <MainVideo
            key={mainVideo.id + "main"}
            videoTitle={mainVideo.title}
            videoAuthors={mainVideo.authors}
            videoId={mainVideo.id}
          />
        )}
        {/* aparecer em 1024px */}
        {mainVideo && (
          <MainVideoDesktopVersion
            key={mainVideo.id}
            videoTitle={mainVideo.title}
            videoAuthors={mainVideo.authors}
            videoId={mainVideo.id}
            VideoDescription={mainVideo.description}
          />
        )}
      </section>
      <div className="flex items-center justify-center">
        <section className="bg-card-bg h-full w-full rounded-xl min-[330px]:w-full md:w-[90%] xl:w-4/5">
          <p className="text-primary-text py-3 pl-3 text-xl font-medium">
            Demais tutoriais
          </p>

          <article className="grid grid-cols-2 gap-2 p-3 max-[425px]:grid-cols-1 lg:grid-cols-3">
            {otherVideos && otherVideos?.length >= 1 ? (
              otherVideos?.map((video: Video) => {
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
    </div>
  );
}
