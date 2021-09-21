import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { Media } from './media.entity';
import { MediaService } from './media.service';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private mediaService: MediaService) {}

  @Mutation(() => Boolean)
  async UploadFiles(
    @Args({ name: 'files', type: () => [GraphQLUpload] })
    files,
  ): Promise<boolean> {
    return this.mediaService.UploadFiles(files);
  }
}
