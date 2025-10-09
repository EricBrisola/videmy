import { YouTubeVideoResource } from "@/types/uploadYoutubeTypes";

const uploadVideoChunks = async (
  locationUrl: string,
  video: File,
): Promise<YouTubeVideoResource | null> => {
  const chunkSize: number = 8 * 1024 * 1024; // 8MB
  let start: number = 0;

  while (start < video.size) {
    const end: number = Math.min(start + chunkSize, video.size);
    const chunk: Blob = video.slice(start, end);

    const endByte = start + chunk.size - 1;

    try {
      const res: Response = await fetch(locationUrl, {
        method: "PUT",
        headers: {
          "Content-Length": `${chunk.size}`,
          "Content-Range": `bytes ${start}-${endByte}/${video.size}`,
        },
        body: chunk,
      });

      if (res.status === 308) {
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
        const videoData = await verifyUploadStatus(locationUrl, video.size);
        if (videoData) {
          return videoData;
        }
      }

      throw error;
    }
  }

  return null;
};

async function verifyUploadStatus(
  uploadUrl: string,
  videoSize: number,
): Promise<YouTubeVideoResource | null> {
  console.log(
    "A confirmação final falhou. Tentando verificar o status do upload...",
  );

  for (let i = 0; i < 2; i++) {
    try {
      const statusResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Range": `bytes */${videoSize}`,
        },
      });

      if (statusResponse.ok) {
        console.log("Verificação bem-sucedida! O upload foi concluído.");
        const videoData = await statusResponse.json();
        return videoData;
      }

      if (statusResponse.status === 308) {
        console.log(
          "Verificação indicou que o upload ainda não foi concluído.",
        );
        return null;
      }
    } catch (error) {
      console.error(`Tentativa de verificação ${i + 1} falhou.`, error);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  console.error(
    "Não foi possível verificar o status do upload após várias tentativas.",
  );
  return null;
}

export default uploadVideoChunks;
