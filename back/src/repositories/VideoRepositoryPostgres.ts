import type { Pool, PoolClient, QueryResult } from "pg";
import type { Video, VideoRepository } from "./VideoRepository.ts";

export class VideoRepositoryPostgres implements VideoRepository {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  async create(video: Video): Promise<void> {
    const client: PoolClient = await this.db.connect();
    const query: string = `INSERT INTO 
    videos (id, title, description, url, defaultThumbnail, mediumThumbnail, highThumbnail) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)`;

    try {
      await client.query("BEGIN");

      await client.query(query, [
        video.id,
        video.title,
        video.description,
        video.url,
        video.defaultThumbnail,
        video.mediumThumbnail,
        video.highThumbnail,
      ]);

      const authors: string[] = video.authors.split(",");

      for (const author of authors) {
        await client.query(
          "INSERT INTO authors (name, video_id) VALUES ($1, $2)",
          [author.trim(), video.id]
        );
      }

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw new Error("Falha em completar transação!");
    } finally {
      client.release();
    }
  }

  async findAll(): Promise<QueryResult<any>> {
    const query: string = `SELECT v.id, v.title, v.description, v.url, v.removed, v.defaultThumbnail, v.mediumThumbnail, v.highThumbnail, STRING_AGG(a.name, ',') AS authors 
    FROM 
      videos AS v 
    JOIN 
      authors AS a 
    ON v.id = a.video_id 
    GROUP BY 
      v.id`;

    try {
      const data = await this.db.query(query);
      return data;
    } catch (error) {
      throw new Error("Falha em buscar vídeos no banco!");
    }
  }

  async findById(id: string): Promise<QueryResult<any>> {
    const query: string = `SELECT v.id, v.title, v.description, v.url, v.removed, v.defaultThumbnail, v.mediumThumbnail, v.highThumbnail, STRING_AGG(a.name, ',') AS authors 
    FROM 
     videos AS v
    JOIN 
      authors a
    ON v.id = a.video_id
    WHERE 
      v.id = $1
    GROUP BY 
      v.id`;

    try {
      const data = await this.db.query(query, [id]);
      return data;
    } catch (error) {
      throw new Error("Falha em buscar um vídeo no banco!");
    }
  }
}
