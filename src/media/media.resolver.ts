import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Media } from '../media/media.entity';
import { GraphQLUpload } from 'apollo-server-express';
import { createWriteStream } from 'fs';

@Resolver(() => Media)
export class MediaResolver {
  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename },
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    );
  }
}
