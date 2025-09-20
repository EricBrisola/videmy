"use client";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";

export default function Page() {
  const params = useParams();
  return (
    <section className="flex min-h-full w-full flex-col items-center justify-center gap-7">
      <article>
        <p className="w-full text-xl font-normal">Título: aqui</p>
        <article className="aspect-video h-52">
          <ReactPlayer
            src="https://www.youtube.com/watch?v=1y5MWMbeqfQ"
            muted={true}
            controls={true}
            width="100%"
            height="100%"
          />
        </article>
        <article className="flex w-[95%] flex-col gap-2">
          <p>Autores</p>
          <p>Descrição</p>
        </article>
      </article>
    </section>
  );
}
