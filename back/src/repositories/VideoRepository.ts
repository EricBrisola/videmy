import type { QueryResult } from "pg";

export type Video = {
  id: string;
  title: string;
  authors: string;
  description: string;
  url: string;
  removed: boolean;
  defaultThumbnail: string;
  mediumThumbnail: string;
  highThumbnail: string;
};

export interface VideoRepository {
  findAll: () => Promise<QueryResult<any>>;
  findById: (id: string) => Promise<QueryResult<any>>;
  create: (video: Video, videoId: string) => Promise<void>;
}
