type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

type Thumbnails = {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard?: Thumbnail;
  maxres?: Thumbnail;
};

type VideoSnippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: {
    title: string;
    description: string;
  };
};

type VideoStatus = {
  uploadStatus: "uploaded" | "processed" | "failed";
  privacyStatus: "private" | "public" | "unlisted";
  license: string;
  embeddable: boolean;
  publicStatsViewable: boolean;
};

export type YouTubeVideoResource = {
  kind: string;
  etag: string;
  id: string;
  snippet: VideoSnippet;
  status: VideoStatus;
};
