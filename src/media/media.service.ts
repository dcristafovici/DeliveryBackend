import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createWriteStream } from 'fs';
import { Repository } from 'typeorm';
import { MediaDTO, MediaSizes } from './media.dto';
import { Media } from './media.entity';
import sharp from 'sharp';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private MediaRepository: Repository<Media>,
  ) {}

  async UploadFiles(data: MediaDTO): Promise<boolean> {
    const upload = await Promise.all(
      await data.map(async (image) => {
        const singleImage = await image;
        const { createReadStream, filename } = singleImage;
        const simpleFileName = filename.split('.')[0];
        const extension = filename.split('.')[1];
        return new Promise(async (resolve, reject) =>
          createReadStream()
            .pipe(createWriteStream(`./uploads/${filename}`, { flags: 'w+' }))
            .on('finish', async () => {
              const createdItem = await this.MediaRepository.save({
                name: simpleFileName,
                path: `./uploads/${filename}`,
              });
              MediaSizes.map(
                async (size) =>
                  await sharp(`./uploads/${filename}`)
                    .resize({ width: size.x })
                    .toFile(
                      `./uploads/build/${simpleFileName}_${size.path}.${extension}`,
                    )
                    .then(async () => {
                      const updatedValue = {
                        [size.path]: `./uploads/build/${simpleFileName}_${size.path}.${extension}`,
                      };
                      await this.MediaRepository.update(
                        createdItem.id,
                        updatedValue,
                      );
                    }),
              );
              resolve(true);
            })
            .on('error', () => reject(false)),
        );
      }),
    )
      .then(() => true)
      .catch(() => false);
    return upload;
  }
}
