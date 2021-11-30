import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  providers: [MediaService, MediaResolver],
  exports: [MediaService],
})
export class MediaModule {}
