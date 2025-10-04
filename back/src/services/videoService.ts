import type { Video } from "../repositories/VideoRepository.js";
import { VideoRepositoryPostgres } from "../repositories/VideoRepositoryPostgres.js";
import pool from "../db/pool.js";
import type { QueryResult } from "pg";
import YoutubeClient from "../utils/youtubeClient.js";

export class VideoService {
  private videoRepositoryPostgres;
  private youtubeClient: YoutubeClient;

  constructor() {
    this.videoRepositoryPostgres = new VideoRepositoryPostgres(pool);
    this.youtubeClient = new YoutubeClient();
  }

  getVideos = async (): Promise<Video[] | []> => {
    try {
      const response: QueryResult<any> =
        await this.videoRepositoryPostgres.findAll();

      if (response.rowCount === null || response.rowCount < 1) {
        throw new Error("nenhum vídeo encontrado");
      }

      const videos: Video[] = response.rows.map((row) => {
        return {
          id: row.id,
          title: row.title,
          authors: row.authors,
          description: row.description,
          url: row.url,
          removed: row.removed,
        };
      });

      return videos;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
    return [];
  };
  getVideoById = async (id: string): Promise<Video | null> => {
    try {
      const response: QueryResult<any> =
        await this.videoRepositoryPostgres.findById(id);

      if (response.rowCount === null || response.rowCount < 1) {
        throw new Error("nenhum vídeo encontrado");
      }

      const video: Video = {
        id: response.rows[0].id,
        title: response.rows[0].title,
        authors: response.rows[0].authors,
        description: response.rows[0].description,
        url: response.rows[0].url,
        removed: response.rows[0].removed,
      };

      return video;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
    return null;
  };

  saveVideoData = async (video: Video): Promise<void> => {};
}
