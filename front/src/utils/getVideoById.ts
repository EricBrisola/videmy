import { Video } from "@/types/video";

const API_URL = import.meta.env.VITE_NEXT_PUBLIC_API_URL;
const getVideoById = async (id: string): Promise<Video | null> => {
  try {
    const response = await fetch(`${API_URL}/videos/${id}`);

    if (response.ok) {
      const video: Video = await response.json();
      return video;
    }
  } catch (error) {
    return null;
  }
  return null;
};

export default getVideoById;
