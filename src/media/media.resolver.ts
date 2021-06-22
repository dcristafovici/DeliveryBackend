import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { Media } from './media.entity';
import { createWriteStream } from 'fs';
import { MediaService } from './media.service';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private mediaService: MediaService) {}
  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file,
  ): Promise<boolean> {
    const upload = await Promise.all(
      await file.map(async (image) => {
        const singleImage = await image;
        const { createReadStream, filename } = singleImage;
        return new Promise(async (resolve, reject) =>
          createReadStream()
            .pipe(createWriteStream(`./uploads/${filename}`, { flags: 'w+' }))
            .on('finish', () => resolve(true))
            .on('error', () => reject(false)),
        );
      }),
    )
      .then(() => true)
      .catch(() => false);

    return upload;
  }

  @Query(() => [Media])
  async getMedia() {
    return this.mediaService.findAll();
  }
}
