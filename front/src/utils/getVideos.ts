import { Video } from "@/types/video";

const API_URL = import.meta.env.VITE_NEXT_PUBLIC_API_URL;
const getVideos = async (): Promise<Video[] | null> => {
  try {
    const response = await fetch(`${API_URL}/videos/`);

    if (response.ok) {
      const videos: Video[] = await response.json();
      return videos;
    }
  } catch (error) {
    return null;
  }
  return null;
};

export default getVideos;
