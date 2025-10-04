import { google, youtube_v3 } from "googleapis";

export default class YoutubeClient {
  private youtube: youtube_v3.Youtube;
  private oauthClient;

  constructor() {
    const clientId = process.env.YOUTUBE_CLIENT_ID;
    const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
    const redirectUri = process.env.YOUTUBE_REDIRECT_URI;
    const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN;

    this.oauthClient = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );

    this.oauthClient.setCredentials({
      refresh_token: refreshToken || null,
    });

    this.youtube = google.youtube({
      version: "v3",
      auth: this.oauthClient,
    });
  }

  giveToken = async (): Promise<string | null> => {
    const token = await this.oauthClient.getAccessToken();
    if (token && token.token) {
      return token.token;
    }
    return null;
  };

  gerarRefreshToken = async (): Promise<string | null> => {
    const { tokens } = await this.oauthClient.getToken(
      "4/0AVGzR1AfWutibg6yiYff-XrJrt-J047bZX2aLkL1lGlROWCbbRrngUjLYy0G6paKJVVLRw"
    );
    if (tokens && tokens.refresh_token) {
      return tokens.refresh_token;
    }
    return null;
  };

  getAllVideosFromPlaylist = async (): Promise<
    youtube_v3.Schema$PlaylistItem[] | null
  > => {
    try {
      if (process.env.YOUTUBE_PLAYLIST_ID) {
        const videos = await this.youtube.playlistItems.list({
          part: ["snippet"],
          playlistId: process.env.YOUTUBE_PLAYLIST_ID,
          maxResults: 20,
        });

        if (videos && videos?.data?.items) {
          return videos.data.items;
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erro desconhecido em buscar vídeos de playlist!");
    }
    return null;
  };

  getVideoById = async (
    id: string
  ): Promise<youtube_v3.Schema$PlaylistItem[] | null> => {
    try {
      const uploadedVideos = await this.getAllVideosFromPlaylist();
      const video = uploadedVideos?.filter(
        (searchedVideo) => searchedVideo?.snippet?.resourceId?.videoId === id
      );

      if (video) {
        return video;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erro desconhecido em buscar vídeos de playlist!");
    }
    return null;
  };

  uploadVideo = async (): Promise<void> => {};
}
