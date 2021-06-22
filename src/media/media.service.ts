import { Injectable } from '@nestjs/common';
import { readdirSync } from 'fs';

@Injectable()
export class MediaService {
  async findAll() {
    const allImages = [];
    readdirSync('./uploads').forEach((file) => {
      allImages.push({ name: file });
    });
    return allImages;
  }
}
