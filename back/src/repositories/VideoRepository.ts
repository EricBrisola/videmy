export type Video = {
  id: string;
  title: string;
  authors: string[];
  description: string;
  url: string;
  removed: boolean;
};

export interface VideoRepository {
  findAll: () => Promise<Video[]>;
  findById: (id: string) => Promise<Video | null>;
  create: (video: Video, uuid: string) => Promise<void>;
}
