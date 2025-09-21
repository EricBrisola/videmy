"use client";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";

export default function Page() {
  const params = useParams();
  return (
    <section className="flex min-h-full w-full flex-col items-center justify-center gap-7">
      <article className="bg-card-bg flex w-[95%] flex-col gap-2 rounded-lg p-3 shadow-md">
        <p className="w-full text-xl font-medium">Docker</p>
        <article className="w-full">
          <div className="aspect-video overflow-hidden rounded-md">
            <ReactPlayer
              src="https://www.youtube.com/watch?v=1y5MWMbeqfQ"
              muted={true}
              controls={true}
              width="100%"
              height="100%"
            />
          </div>
        </article>
        <article className="flex w-full flex-col gap-2">
          <div className="">
            <p className="text-justify text-lg font-medium">Autores:</p>
            <p>Augusto mazocco, Eric Coca Brisola</p>
          </div>
          <div className="">
            <p className="text-lg font-medium">Descrição:</p>
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
              asperiores et, voluptas mollitia dolorum aperiam, nisi molestiae
              temporibus unde in perspiciatis, est eaque vel debitis facilis
              tempora odio. Itaque, doloremque.
            </p>
          </div>
        </article>
      </article>
    </section>
  );
}
