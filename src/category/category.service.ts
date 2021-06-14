import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDTO } from './category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOne(id);
  }
  create(details: CategoryDTO) {
    this.categoryRepository.insert(details);
  }
}
