import type { GaxiosResponse } from "googleapis-common";
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

  // giveToken = async (): Promise<string | null> => {
  //   const token = await this.oauthClient.getAccessToken();
  //   if (token && token.token) {
  //     return token.token;
  //   }
  //   return null;
  // };

  // gerarRefreshToken = async (): Promise<string | null> => {
  //   const { tokens } = await this.oauthClient.getToken(
  //     "4/0AVGzR1AfWutibg6yiYff-XrJrt-J047bZX2aLkL1lGlROWCbbRrngUjLYy0G6paKJVVLRw"
  //   );
  //   if (tokens && tokens.refresh_token) {
  //     return tokens.refresh_token;
  //   }
  //   return null;
  // };

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

  initiateVideoUpload = async (formInfos: {
    title: string;
    description: string;
    videoSize: number;
    videoType: string;
  }): Promise<string | null> => {
    const authenticatedClient = this.oauthClient;

    const request = {
      method: "POST",
      url: "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
      headers: {
        "X-Upload-Content-Length": `${formInfos.videoSize}`,
        "X-Upload-Content-Type": formInfos.videoType,
      },
      data: {
        snippet: {
          title: formInfos.title,
          description: formInfos.description,
        },
        status: {
          privacyStatus: "unlisted",
        },
      },
    };

    try {
      const response = await authenticatedClient.request(request);

      if (response && response.headers) {
        return response.headers.get("Location");
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  checkUploadStatus = async (
    uploadUrl: string,
    videoSize: number
  ): Promise<youtube_v3.Schema$Video | null> => {
    console.log("[Backend] Verificando status final do upload em:", uploadUrl);

    const authenticatedClient = this.oauthClient;

    try {
      const statusResponse: GaxiosResponse<youtube_v3.Schema$Video> =
        await authenticatedClient.request({
          method: "PUT",
          url: uploadUrl,
          headers: {
            "Content-Range": `bytes */${videoSize}`,
          },
        });

      if (statusResponse.status === 200 || statusResponse.status === 201) {
        return statusResponse.data;
      }

      console.log(
        "[Backend] Verificação indicou que o upload não foi concluído. Status:",
        statusResponse.status
      );
      return null;
    } catch (error) {
      console.error(
        "[Backend] Erro ao tentar verificar o status do upload:",
        error
      );
      return null;
    }
  };
}
