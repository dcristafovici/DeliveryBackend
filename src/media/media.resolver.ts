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

  @Mutation(() => Media)
  async createMedia(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file,
  ): Promise<Media> {
    return this.mediaService.create(file);
  }

  @Mutation(() => Media)
  async deleteMedia(@Args('id') id: string): Promise<Media> {
    return this.mediaService.delete(id);
  }
}
