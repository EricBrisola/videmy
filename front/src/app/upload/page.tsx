import UploadForm from "../components/UploadForm";

export default function Upload() {
  return (
    <section className="flex min-h-full w-full flex-col items-center justify-center gap-10 p-2">
      <p className="text-center text-xl font-normal">
        Contribua publicando sua videoaula
      </p>
      <UploadForm />
    </section>
  );
}
