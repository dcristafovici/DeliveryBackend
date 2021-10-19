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

  async GetImages(): Promise<Media[]> {
    return this.MediaRepository.find({ order: { created_at: 'DESC' } });
  }

  async GetImage(id: string): Promise<Media> {
    return this.MediaRepository.findOne(id);
  }

  async GetImageByID(id: string): Promise<Media> {
    return this.MediaRepository.findOne(id);
  }

  // TO-DO When we delete media from the database, it should be removed from the folder.
  deleteByID(id: string): Promise<any> {
    return this.MediaRepository.delete(id);
  }

  async UploadFiles(data: MediaDTO): Promise<boolean> {
    const upload = await Promise.all(
      await data.map(async (image) => {
        const singleImage = await image;
        const { createReadStream, filename } = singleImage;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const simpleFileName = `media_${uniqueSuffix}`;
        const extension = filename.split('.')[1];
        return new Promise(async (resolve, reject) =>
          createReadStream()
            .pipe(
              createWriteStream(`./uploads/${simpleFileName}.${extension}`, {
                flags: 'w+',
              }),
            )
            .on('finish', async () => {
              const createdItem = await this.MediaRepository.save({
                name: simpleFileName,
                path: `/${simpleFileName}.${extension}`,
              });
              MediaSizes.map(
                async (size) =>
                  await sharp(`./uploads/${simpleFileName}.${extension}`)
                    .resize({ width: size.x })
                    .toFile(
                      `./uploads/build/${simpleFileName}_${size.path}.${extension}`,
                    )
                    .then(async () => {
                      const updatedValue = {
                        [size.path]: `/build/${simpleFileName}_${size.path}.${extension}`,
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
