import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    return this.CategoryRepository.save(data);
  }
  findAll(): Promise<Category[]> {
    return this.CategoryRepository.find();
  }
}
