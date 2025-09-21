"use client";

import { useState } from "react";
import TextInput from "./TextInput";
import { formData } from "@/types/formData";

export default function UploadForm() {
  const [formData, SetFormData] = useState<formData>({
    title: "",
    authors: "",
    description: "",
    video: null,
  });

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log(formData);
  };

  const handleVideoChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    SetFormData((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.files?.[0] ?? null,
    }));
  };

  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    SetFormData((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  return (
    <form
      className="bg-card-bg flex w-[18rem] flex-col items-center justify-center gap-3 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <section className="flex w-[17rem] flex-col items-center justify-center gap-3 p-4">
        <TextInput
          name="title"
          placeholder="Título"
          id=""
          onChange={handleChange}
          value={formData.title}
        />
        <TextInput
          name="authors"
          placeholder="Autores"
          id="authors"
          onChange={handleChange}
          value={formData.authors}
        />
        <article className="flex w-full flex-col gap-3">
          <p className="leading-none font-medium">Vídeo</p>
          <label
            htmlFor="video_input"
            className="border-gray flex h-[3.25rem] items-center justify-center rounded-md border-[1px] border-dashed p-2"
          >
            {formData.video ? (
              <p className="font-medium">{formData.video.name.slice(0, 25)}</p>
            ) : (
              <p className="font-medium">Escolha seu arquivo aqui</p>
            )}
            <input
              type="file"
              accept="video/*"
              name="video"
              className="bg-gray hidden"
              id="video_input"
              onChange={handleVideoChange}
            />
          </label>
        </article>
        <label htmlFor="description" className="flex w-full flex-col gap-3">
          <p className="leading-none font-medium">Descrição</p>
          <textarea
            name="description"
            className="border-gray focus:border-highlight-blue h-24 resize-none rounded-md border-[1px] px-2 py-2 outline-none"
            onChange={handleChange}
            value={formData.description}
            id="description"
          ></textarea>
        </label>
        <button className="bg-highlight-blue mt-1 w-full rounded-md px-6 py-2 font-medium text-white">
          Publicar
        </button>
      </section>
    </form>
  );
}
