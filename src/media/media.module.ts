import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaResolver } from './media.resolver';
import { Media } from './media.entity';
import { MediaService } from './media.service';

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  providers: [MediaResolver, MediaService],
  exports: [MediaService],
})
export class MediaModule {}
