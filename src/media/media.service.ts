import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileDTO, MediaSizes } from './media.dto';
import { Media } from './media.entity';
import sharp from 'sharp';
import slugify from 'slugify';
import {
  bucketParams,
  parallelUploads3,
  S3Client,
  sharpFunction,
} from './media.s3';
import { Upload } from '@aws-sdk/lib-storage';

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

  // async create(file: FileDTO): Promise<Media> {
  //   const { createReadStream, filename } = file;

  //   const simpleFileName = slugify(filename.split('.')[0]);
  //   const extension = filename.split('.')[1];
  //   return new Promise((resolve, reject) => {
  //     createReadStream()
  //       .pipe(
  //         createWriteStream(`./uploads/${simpleFileName}.${extension}`, {
  //           flags: 'w+',
  //         }),
  //       )
  //       .on('finish', async () => {
  //         const newMediaEntity = new Media();

  //         newMediaEntity.name = simpleFileName;
  //         newMediaEntity.path = `${simpleFileName}.${extension}`;

  //         const mediaResizesPromises = MediaSizes.map(async (size) => {
  //           return sharp(`./uploads/${simpleFileName}.${extension}`)
  //             .resize({ width: size.x })
  //             .toFile(
  //               `./uploads/build/${simpleFileName}_${size.path}.${extension}`,
  //             )
  //             .then(() => {
  //               newMediaEntity[
  //                 size.path
  //               ] = `/build/${simpleFileName}_${size.path}.${extension}`;
  //             });
  //         });

  //         Promise.all(mediaResizesPromises).then(async () => {
  //           return await this.mediaRepository
  //             .save(newMediaEntity)
  //             .then((res) => resolve(res));
  //         });
  //       })
  //       .on('error', (err) => reject(err));
  //   })
  //     .then((res: Promise<Media>) => res)
  //     .catch((err) => {
  //       console.log(err);
  //       throw new HttpException(
  //         {
  //           status: HttpStatus.SERVICE_UNAVAILABLE,
  //           errorCode: err.code,
  //         },
  //         HttpStatus.SERVICE_UNAVAILABLE,
  //       );
  //     });
  // }

  async create(file: FileDTO): Promise<boolean> {
    const MediaEntity = new Media();

    const { filename, createReadStream } = file;
    const fileToUpload = createReadStream();
    MediaEntity.name = filename;

    const simpleFileName = slugify(filename.split('.')[0]);
    const extension = filename.split('.')[1];

    const uploadOriginalImage = parallelUploads3(
      bucketParams(`uploads/${simpleFileName}.${extension}`, fileToUpload),
    );

    return uploadOriginalImage
      .done()
      .then(() => {
        MediaEntity.path = `${process.env.OCEAN_S3_LOCATION}/uploads/${simpleFileName}.${extension}`;

        const mediaResizesPromises = MediaSizes.map(async (size) => {
          // To-Do Change first parameter of function,because this path is not always available
          const resizedFile = await sharpFunction(
            fileToUpload._writeStream._path,
            size.x,
          );

          const uploadResizedImage = await parallelUploads3(
            bucketParams(
              `uploads/resized/${simpleFileName}_${size.path}.${extension}`,
              resizedFile,
            ),
          );
          MediaEntity[
            size.path
          ] = `${process.env.OCEAN_S3_LOCATION}/uploads/resized/${simpleFileName}_${size.path}.${extension}`;
          return await uploadResizedImage
            .done()
            .then(() => true)
            .catch(() => false);
        });
        return Promise.all(mediaResizesPromises).then(async () => {
          return await this.mediaRepository
            .save(MediaEntity)
            .then(() => true)
            .catch(() => false);
        });
      })
      .catch(() => false);
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
  }
}
