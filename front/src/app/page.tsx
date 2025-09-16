import Image from "next/image";
import MainVideo from "./components/MainVideo";
import VideoCard from "./components/VideoCard";

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-3 p-2">
      <MainVideo />
      <section className="bg-card-bg rounded-xl">
        <p className="text-primary-text py-3 pl-3 text-xl font-medium">
          Demais tutoriais
        </p>
        <article className="grid grid-cols-2 gap-2 pb-3">
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </article>
      </section>
    </div>
  );
}
