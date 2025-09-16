import TextInput from "./TextInput";

export default function UploadForm() {
  return (
    <form className="bg-card-bg flex flex-col">
      <TextInput name="video_title" placeholder="Título..." value="" />
      <TextInput name="video_author" placeholder="Autores..." value="" />
      <TextInput name="video_tags" placeholder="Tags..." value="" />
      <input type="file" accept="video/*" name="video" />
      <textarea name="description" placeholder="Descrição..."></textarea>
      <button>Publicar</button>
    </form>
  );
}
