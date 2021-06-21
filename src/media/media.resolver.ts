import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Media } from '../media/media.entity';
import { GraphQLUpload } from 'apollo-server-express';
import { createWriteStream } from 'fs';
import { resolve } from 'path/posix';

@Resolver(() => Media)
export class MediaResolver {
  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file,
  ): Promise<boolean> {
    await Promise.all(
      file.map(async (image) => {
        const singleImage = await image;
        const { createReadStream, filename } = singleImage;
        createReadStream()
          .pipe(createWriteStream(`./uploads/${filename}`))
          .on('finish', () => console.log('true'))
          .on('error', () => console.log('false'));
      }),
    );
    return true;
    // return new Promise(async (resolve, reject) =>
    //   createReadStream()
    //     .pipe(createWriteStream(`./uploads/${filename}`))
    //     .on('finish', () => resolve(true))
    //     .on('error', () => reject(false)),
    // );
  }
}
