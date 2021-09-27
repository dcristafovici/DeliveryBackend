import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { Media } from './media.entity';
import { MediaService } from './media.service';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private mediaService: MediaService) {}

  @Query(() => [Media])
  async GetImages(): Promise<Media[]> {
    return await this.mediaService.GetImages();
  }

  @Query(() => Media)
  async GetImageByID(@Args('id') id: string): Promise<Media> {
    return await this.mediaService.GetImageByID(id);
  }

  @Mutation(() => Boolean)
  async UploadFiles(
    @Args({ name: 'files', type: () => [GraphQLUpload] })
    files,
  ): Promise<boolean> {
    return this.mediaService.UploadFiles(files);
  }
}
