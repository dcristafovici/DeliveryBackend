import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { createWriteStream } from 'graceful-fs';
import { GraphQLUpload } from 'graphql-upload';
import { Media } from './media.entity';
import { MediaService } from './media.service';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private mediaService: MediaService) {}

  @Mutation(() => Boolean)
  async UploadFiles(
    @Args({ name: 'files', type: () => [GraphQLUpload] })
    file,
  ): Promise<boolean> {
    // const upload = await Promise.all(
    //   await file.map(async (image) => {
    //     const singleImage = await image;
    //     const { createReadStream, filename } = singleImage;
    //     return new Promise(async (resolve, reject) =>
    //       createReadStream()
    //         .pipe(createWriteStream(`./uploads/${filename}`, { flags: 'w+' }))
    //         .on('finish', () => resolve(true))
    //         .on('error', () => reject(false)),
    //     );
    //   }),
    // )
    //   .then(() => true)
    //   .catch(() => false);

    // return upload;
    console.log(file);
    return true;
  }
}
