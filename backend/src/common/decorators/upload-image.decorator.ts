import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { join } from 'path';

export function UploadImage(fieldName = 'image', uploadFolder = 'uploads') {
  const destination = join(process.cwd(), uploadFolder);

  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: diskStorage({
          destination,
          filename: (req, file, callback) => {
            const name = file.originalname.replace(/\s+/g, '').split('.')[0];
            const ext = extname(file.originalname);
            const filename = `${name}-${Date.now()}${ext}`;
            callback(null, filename);
          },
        }),
        fileFilter: (req, file, callback) => {
          const allowedTypes = /\/(jpg|jpeg|png|gif)$/;
          if (!file.mimetype.match(allowedTypes)) {
            return callback(new Error('Only image files are allowed!'), false);
          }
          callback(null, true);
        },
        limits: {
          fileSize: 5 * 1024 * 1024,
        },
      })
    )
  );
}
