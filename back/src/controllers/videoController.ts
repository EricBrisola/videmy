import type { Video } from "../repositories/VideoRepository.js";
import { VideoService } from "../services/videoService.js";
import type { Request, Response } from "express";

export class VideoController {
  private videoService: VideoService;

  constructor() {
    this.videoService = new VideoService();
  }

  //GET /videos/
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const videos: Video[] = await this.videoService.getVideos();

      return res.status(200).json(videos);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
    return res
      .status(404)
      .json({ message: "Erro desconhecido ao buscar vídeos!" });
  };

  //GET /videos/:id
  show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      if (!id) {
        return res.status(400).json({ message: "Id não fornecido!" });
      }

      const video: Video | null = await this.videoService.getVideoById(id);

      return res.status(200).json(video);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
    return res.status(404).json({ message: "Erro desconhecido buscar vídeo!" });
  };

  initializeUpload = async (req: Request, res: Response): Promise<Response> => {
    const { title, description, videoSize, videoType } = req.body;

    try {
      if (!title || !description || !videoSize || !videoType) {
        return res.status(400).json({ message: "Preencha todos os campos!" });
      }

      const uploadUrl = await this.videoService.getUploadUrl({
        title,
        description,
        videoSize,
        videoType,
      });
      if (!uploadUrl) {
        throw new Error("Erro ao obter URL!");
      }

      return res.status(200).json({ uploadUrl });
    } catch (error) {
      return res.status(500).json({ message: "Falha ao iniciar upload!" });
    }
  };

  verifyUploadStatus = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { uploadUrl, videoSize } = req.body;

      if (!uploadUrl || !videoSize) {
        return res
          .status(400)
          .json({ message: "URL ou tamanho do vídeo são necessários!" });
      }

      const videoData = await this.videoService.getUploadStatus(
        uploadUrl,
        videoSize
      );

      if (
        videoData &&
        videoData.id &&
        videoData?.snippet?.localized?.title &&
        videoData?.snippet?.localized?.description &&
        videoData.snippet.thumbnails
      ) {
        const videoThumbnails = videoData.snippet.thumbnails;
        const defaultThumb = videoThumbnails?.default?.url ?? "";
        const mediumThumb = videoThumbnails?.default?.url ?? "";
        const highThumb = videoThumbnails?.default?.url ?? "";

        await this.videoService.saveVideoData(
          videoData?.id,
          videoData?.snippet?.localized?.title,
          videoData?.snippet?.localized?.description,
          { defaultThumb, mediumThumb, highThumb }
        );
        return res.status(200).json(videoData);
      }
      return res
        .status(400)
        .json({ message: "Upload não encontrado ou não finalizado!" });
    } catch (error) {
      console.error("[Controller] Falha ao verificar status do upload:", error);
      return res
        .status(500)
        .json({ message: "Falha interna ao verificar status do upload." });
    }
  };
}
