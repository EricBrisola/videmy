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

  // POST /videos/
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, authors, description } = req.body;
      const video = req.file;

      if (!title || !authors || !description || !video) {
        res
          .status(400)
          .json({ message: "Informações incompletas para o envio do vídeo" });
        return;
      }

      const newVideo: Video = {
        id: "",
        title: title,
        authors: authors,
        description: description,
        url: "",
        removed: false,
      };

      //TODO: falta inserir o video, como vai fazer?

      //await this.videoService.uploadVideoToYoutube(newVideo);

      res.status(201).json({ message: "Vídeo enviado com sucesso!" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(404).json({ message: "Erro desconhecido ao upar vídeo!" });
      }
    }
  };

  // token = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const accessToken = await this.youtubeClient.giveToken();
  //     res.status(200).json({ accessToken });
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       res.status(400).json({ message: error.message });
  //     } else {
  //       res.status(404).json({ message: "Erro desconhecido" });
  //     }
  //   }
  // };

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
      return res.status(500).json({ message: "Falaha ao iniciar upload!" });
    }
  };
}
