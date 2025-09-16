import UploadForm from "../components/UploadForm";

export default function Upload() {
  return (
    <section className="flex w-full flex-col gap-3 p-2">
      <p className="text-center text-xl font-medium">
        Contribua publicando sua videoaula
      </p>
      <UploadForm />
    </section>
  );
}
