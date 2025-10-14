import { Video } from "@/types/video";

const getVideoById = async (id: string): Promise<Video | null> => {
  try {
    const response = await fetch(`http://localhost:4000/videos/${id}`);

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
