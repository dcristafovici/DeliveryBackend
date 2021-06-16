import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Media } from '../media/media.entity';
import { MediaService } from '../media/media.service';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private mediaService: MediaService) {}
}
