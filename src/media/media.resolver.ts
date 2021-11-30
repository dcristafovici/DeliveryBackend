import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { Media } from './media.entity';
import { MediaService } from './media.service';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private mediaService: MediaService) {}

  @Query(() => [Media])
  async findMedia(): Promise<Media[]> {
    return this.mediaService.find();
  }
  @Query(() => Media)
  async findOneMedia(@Args('id') id: string): Promise<Media> {
    return this.mediaService.findOne(id);
  }

  @Mutation(() => Boolean)
  async createMedia(
    @Args({ name: 'files', type: () => [GraphQLUpload] })
    files,
  ): Promise<boolean> {
    return this.mediaService.create(files);
  }

  @Mutation(() => Boolean)
  async deleteMedia(@Args('id') id: string): Promise<boolean> {
    return this.mediaService.delete(id);
  }
}
