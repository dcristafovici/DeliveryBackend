import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaDTO, MediaSizes } from './media.dto';
import { Media } from './media.entity';
import sharp from 'sharp';
import { createWriteStream } from 'fs';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) {}

  find(): Promise<Media[]> {
    return this.mediaRepository.createQueryBuilder('category').getMany();
  }

  findOne(id: string): Promise<Media> {
    return this.mediaRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id })
      .getOne();
  }

  async create(data: MediaDTO): Promise<boolean> {
    const upload = await Promise.all(
      await data.map(async (image) => {
        const { createReadStream, filename } = await image;
        const simpleFileName = `${Date.now()}`;
        const extension = filename.split('.')[1];
        return await new Promise(async (resolve, reject) =>
          createReadStream()
            .pipe(
              createWriteStream(`./uploads/${simpleFileName}.${extension}`, {
                flags: 'w+',
              }),
            )
            .on('finish', async () => {
              const createdItem = await this.mediaRepository.save({
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
                      await this.mediaRepository.update(
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

  async delete(id: string): Promise<boolean> {
    const { affected } = await this.mediaRepository
      .createQueryBuilder('category')
      .delete()
      .where('id = :id', { id })
      .execute();
    return affected ? true : false;
  }
}
