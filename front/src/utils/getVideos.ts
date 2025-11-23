import { Video } from "@/types/video";

const getVideos = async (): Promise<Video[] | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/videos/`, {
      cache: "no-store",
    });

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
