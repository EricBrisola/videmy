import { YouTubeVideoResource } from "@/types/uploadYoutubeTypes";

const API_URL = import.meta.env.VITE_NEXT_PUBLIC_API_URL;

const verifyWithBackendTheUpload = async (
  uploadUrl: string,
  videoSize: number,
): Promise<YouTubeVideoResource | null> => {
  console.log(
    "A confirmação final falhou no navegador. Pedindo para o backend verificar...",
  );
  try {
    const response = await fetch(`${API_URL}/videos/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uploadUrl, videoSize }),
    });

    if (response.ok) {
      const videoData: YouTubeVideoResource = await response.json();
      console.log("O backend confirmou o sucesso do upload!");
      console.log(videoData);

      return videoData;
    }
    console.error("O backend não conseguiu confirmar o sucesso do upload.");
    return null;
  } catch (error) {
    console.error(
      "Erro ao se comunicar com o backend para verificação.",
      error,
    );
    return null;
  }
};
export default verifyWithBackendTheUpload;
