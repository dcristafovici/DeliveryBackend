import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileDTO, MediaSizes } from './media.dto';
import { Media } from './media.entity';
import slugify from 'slugify';
import { bucketParams, parallelUploads3, sharpFunction } from './media.s3';

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
          return uploadResizedImage
            .done()
            .then(() => true)
            .catch(() => false);
        });
        return Promise.all(mediaResizesPromises).then(async () => {
          return this.mediaRepository.save(MediaEntity);
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
