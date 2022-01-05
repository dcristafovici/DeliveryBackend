import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileDTO, MediaSizes } from './media.dto';
import { Media } from './media.entity';
import sharp from 'sharp';
import { createWriteStream } from 'fs';
import slugify from 'slugify';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) {}

  find(): Promise<Media[]> {
    return this.mediaRepository
      .createQueryBuilder('media')
      .orderBy('media.created_at', 'DESC')
      .getMany();
  }

  findOne(id: string): Promise<Media> {
    return this.mediaRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id })
      .getOne();
  }

  async create(file: FileDTO): Promise<Media> {
    const { createReadStream, filename } = file;

    const simpleFileName = slugify(filename.split('.')[0]);
    const extension = filename.split('.')[1];
    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(
          createWriteStream(`./uploads/${simpleFileName}.${extension}`, {
            flags: 'w+',
          }),
        )
        .on('finish', async () => {
          const newMediaEntity = new Media();

          newMediaEntity.name = simpleFileName;
          newMediaEntity.path = `${simpleFileName}.${extension}`;

          const mediaResizesPromises = MediaSizes.map(async (size) => {
            return sharp(`./uploads/${simpleFileName}.${extension}`)
              .resize({ width: size.x })
              .toFile(
                `./uploads/build/${simpleFileName}_${size.path}.${extension}`,
              )
              .then(() => {
                newMediaEntity[
                  size.path
                ] = `/build/${simpleFileName}_${size.path}.${extension}`;
              });
          });

          Promise.all(mediaResizesPromises).then(async () => {
            return await this.mediaRepository
              .save(newMediaEntity)
              .then((res) => resolve(res));
          });
        })
        .on('error', (err) => reject(err));
    })
      .then((res: Promise<Media>) => res)
      .catch((err) => {
        console.log(err);
        throw new HttpException(
          {
            status: HttpStatus.SERVICE_UNAVAILABLE,
            errorCode: err.code,
          },
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      });
  }

  async delete(id: string): Promise<Media> {
    const { affected } = await this.mediaRepository
      .createQueryBuilder('category')
      .delete()
      .where('id = :id', { id })
      .execute();
    const deletedItem = new Media();
    deletedItem.id = id;
    return affected && deletedItem;

    throw new HttpException(
      {
        status: HttpStatus.SERVICE_UNAVAILABLE,
      },
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
