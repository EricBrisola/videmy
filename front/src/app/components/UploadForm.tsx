"use client";

import { useState } from "react";
import TextInput from "./TextInput";
import { FormData } from "@/types/formData";

import uploadVideoChunks from "@/utils/uploadVideoChunks";
import startUpload from "@/utils/startUpload";
import ModalController from "@/utils/ModalController";
import Modal from "./Modal";
import Loader from "./Loader";
import loadingAnimation from "@/app/assets/loading-animation.json";
import { toaster } from "@/utils/toaster";

const UploadForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    authors: "",
    description: "",
    video: null,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isModalOpen, closeModal, openModal } = ModalController();

  const handleUploadProgress = (progress: number): void => {
    setUploadProgress(progress);
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!formData.video || !formData.title || !formData.description) {
      //alert("Por favor, preencha todos os campos.");
      toaster.warningMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      openModal();
      setIsSubmitButtonDisabled(true);
      setIsLoading(true);
      const uploadUrl = await startUpload(formData.video, {
        title: formData.title,
        description: `${formData.authors} | ${formData.description}`,
      });
      setIsLoading(false);
      const videoData = await uploadVideoChunks(
        uploadUrl,
        formData.video,
        handleUploadProgress,
      );

      if (videoData) {
        console.log("dados do vídeo:", videoData);
        toaster.successMessage(
          `Link: https://www.youtube.com/watch?v=${videoData.id}\nFeito por: ${videoData?.snippet.localized.description.split("|")[0]}\n`,
        );
        // alert(
        //   `Vídeo: https://www.youtube.com/watch?v=${videoData.id}\nFeito por: ${videoData?.snippet.localized.description.split("|")[0]}`,
        // );

        setFormData({
          title: "",
          authors: "",
          description: "",
          video: null,
        });
      } else {
        throw new Error("O processo de upload não foi concluído com sucesso.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toaster.errorMessage(`${error.message}`);
      } else {
        toaster.errorMessage("Ocorreu um erro desconhecido durante o upload.");
      }
    } finally {
      closeModal();
      setIsSubmitButtonDisabled(false);
      setUploadProgress(0);
    }
  };

  const handleVideoChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.files?.[0] ?? null,
    }));
  };

  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  return (
    <>
      <form
        className="bg-card-bg flex w-[18rem] flex-col items-center justify-center gap-3 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <section className="flex w-[17rem] flex-col items-center justify-center gap-3 p-4">
          <TextInput
            name="title"
            inputName="Título"
            placeholder="Docker..."
            id=""
            onChange={handleChange}
            value={formData.title}
          />
          <TextInput
            name="authors"
            inputName="Autores"
            placeholder="Autor 1, Autor 2..."
            id="authors"
            onChange={handleChange}
            value={formData.authors}
          />
          <article className="flex w-full flex-col gap-3">
            <p className="leading-none font-medium lg:text-lg">Vídeo</p>
            <label
              htmlFor="video_input"
              className="border-gray flex h-[3.25rem] items-center justify-center rounded-md border-[1px] border-dashed p-2"
            >
              {formData.video ? (
                <p className="font-medium">
                  {formData.video.name.slice(0, 25)}
                </p>
              ) : (
                <p className="font-medium lg:text-lg">Escolha seu vídeo aqui</p>
              )}
              <input
                type="file"
                accept="video/*"
                name="video"
                className="bg-gray hidden"
                id="video_input"
                onChange={handleVideoChange}
                required
              />
            </label>
          </article>
          <label htmlFor="description" className="flex w-full flex-col gap-3">
            <p className="leading-none font-medium lg:text-lg">Descrição</p>
            <textarea
              name="description"
              className="border-gray focus:border-highlight-blue h-24 resize-none rounded-md border-[1px] px-2 py-2 outline-none"
              onChange={handleChange}
              value={formData.description}
              id="description"
              placeholder="Docker é uma plataforma projetada..."
            ></textarea>
          </label>
          <button
            className={`${isSubmitButtonDisabled ? "disableButtonLayout" : "ableButtonLayout"} lg:text-lg`}
            disabled={isSubmitButtonDisabled}
          >
            Publicar
          </button>
        </section>
      </form>
      {isModalOpen && (
        <Modal>
          <article className="bg-main-bg mx-4 flex flex-col items-center gap-2 rounded-lg p-5">
            {isLoading ? (
              <Loader animation={loadingAnimation} />
            ) : (
              <>
                <p className="font-medium">
                  Upando seu vídeo, aguarde um momento...
                </p>
                <progress max="100" value={uploadProgress} />
                <p className="font-medium">{uploadProgress}%</p>
              </>
            )}
          </article>
        </Modal>
      )}
    </>
  );
};

export default UploadForm;
