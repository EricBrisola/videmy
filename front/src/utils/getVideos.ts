import { Video } from "@/types/video";

const getVideos = async (): Promise<Video[] | null> => {
  try {
    const response = await fetch("http://localhost:4000/videos/");

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
