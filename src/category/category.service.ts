import { ConflictException, Injectable } from '@nestjs/common';
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

  async create(data: AddCategoryInput): Promise<Category> {
    const CategoryExist = await this.CategoryRepository.findOne({
      where: { name: data.name },
    });
    if (CategoryExist) {
      throw new ConflictException(
        `The category with the name "${data.name}" already exists.`,
      );
    }
    const slug = slugify(data.name, { lower: true });
    const dataWithSlug = { ...data, slug };
    return this.CategoryRepository.save(dataWithSlug);
  }
  findAll(): Promise<Category[]> {
    return this.CategoryRepository.find();
  }
}
