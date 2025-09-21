import { Metadata } from "next";
import UploadForm from "../components/UploadForm";

export const metadata: Metadata = {
  title: "Videmy | Upload",
  description: "Página de upload",
};

export default function Page() {
  return (
    <section className="flex min-h-full w-full flex-col items-center justify-center gap-7">
      <p className="w-72 text-center text-xl font-normal">
        Contribua publicando o vídeo do seu trabalho
      </p>
      <UploadForm />
    </section>
  );
}
