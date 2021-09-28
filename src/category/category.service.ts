import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { Repository } from 'typeorm';
import { AddCategoryInput } from './category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
  ) {}

  create(data: AddCategoryInput): Promise<Category> {
    const slug = slugify(data.name, { lower: true });
    const dataWithSlug = { ...data, slug };
    return this.CategoryRepository.save(dataWithSlug);
  }
  findAll(): Promise<Category[]> {
    return this.CategoryRepository.find();
  }
}
