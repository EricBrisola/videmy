"use client";

import { useState } from "react";
import TextInput from "./TextInput";
import { FormData } from "@/types/formData";

import uploadVideoChunks from "@/utils/uploadVideoChunks";
import startUpload from "@/utils/startUpload";

export default function UploadForm() {
  const [formData, SetFormData] = useState<FormData>({
    title: "",
    authors: "",
    description: "",
    video: null,
  });

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    // ev.preventDefault();
    // console.log(formData);

    // try {
    //   if (
    //     formData.video &&
    //     formData.authors &&
    //     formData.title &&
    //     formData.description
    //   ) {
    //     const uploadUrl = await startUpload(formData.video, {
    //       title: formData.title,
    //       description: `${formData.authors} | ${formData.description}`,
    //     });

    //     if (uploadUrl) {
    //       await uploadVideoChunks(uploadUrl, formData.video);
    //     }
    //   }
    // } catch (error) {
    //   if (error instanceof Error) {
    //     throw new Error(error.message);
    //   }
    //   throw new Error("Erro desconhecido!");
    // }

    ev.preventDefault();

    if (!formData.video || !formData.title || !formData.description) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      console.log("--- Iniciando tentativa única de upload ---");

      const uploadUrl = await startUpload(formData.video, {
        title: formData.title,
        description: `${formData.authors || ""} | ${formData.description}`,
      });

      const videoData = await uploadVideoChunks(uploadUrl, formData.video);

      if (videoData) {
        console.log("ID do vídeo:", videoData.id);
        alert("Vídeo enviado com sucesso!");
      } else {
        throw new Error("O processo de upload não foi concluído com sucesso.");
      }
    } catch (error) {
      console.error("A tentativa de upload falhou:", error);
      if (error instanceof Error) {
        alert(`Erro no upload: ${error.message}`);
      } else {
        alert("Ocorreu um erro desconhecido durante o upload.");
      }
    }
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
        <button className="bg-highlight-blue mt-1 w-full rounded-md px-6 py-2 font-medium text-white outline-none">
          Publicar
        </button>
      </section>
    </form>
  );
}
