import multer, { type StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, "../../../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, callback) => callback(null, uploadPath),
  filename: (req, file, callback) =>
    callback(null, `${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 * 1024,
    //10GB
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith("video/")) {
      callback(null, true);
    } else {
      callback(new Error("Apenas vídeos podem ser enviados!"));
    }
  },
});
export default upload;
