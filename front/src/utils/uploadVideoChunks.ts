import { YouTubeVideoResource } from "@/types/uploadYoutubeTypes";
import verifyWithBackendTheUpload from "./verifyWithBackendTheUpload";

const uploadVideoChunks = async (
  locationUrl: string,
  video: File,
): Promise<YouTubeVideoResource | null> => {
  const chunkSize: number = 8 * 1024 * 1024; // 8MB
  let start: number = 0;

  while (start < video.size) {
    const end: number = Math.min(start + chunkSize, video.size);
    const chunk: Blob = video.slice(start, end);

    try {
      const res: Response = await fetch(locationUrl, {
        method: "PUT",
        headers: {
          "Content-Length": `${chunk.size}`,
          "Content-Range": `bytes ${start}-${end - 1}/${video.size}`,
        },
        body: chunk,
      });

      if (res.status === 308) {
        console.log(
          `Chunk de ${start / 1024 / 1024} a ${end / 1024 / 1024}MB enviado. Status: 308.`,
        );
        start = end;
      } else if (res.ok) {
        const videoData = await res.json();
        return videoData;
      } else {
        throw new Error(`Falha no upload! Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Erro de rede ao enviar chunk.", error);

      if (end === video.size) {
        const videoData = await verifyWithBackendTheUpload(
          locationUrl,
          video.size,
        );
        if (videoData) {
          return videoData;
        }
      }

      throw error;
    }
  }

  return null;
};

export default uploadVideoChunks;
