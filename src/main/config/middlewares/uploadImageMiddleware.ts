import crypto from 'crypto';
import multer from 'multer';
import path, { resolve } from 'path';

const tempFolder = resolve(__dirname, '..', '..', '..', 'tmp');

const validImageExtensions = [
  '.png',
  '.jpg',
  '.jpeg',
];

export default multer({
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);

    if (!validImageExtensions.includes(ext)) {
      return callback(new Error('Only images are allowed'));
    }

    return callback(null, true);
  },
  storage: multer.diskStorage({
    destination: tempFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
});
