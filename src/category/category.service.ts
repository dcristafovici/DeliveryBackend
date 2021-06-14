import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  create(newCategory) {
    this.categoryRepository.insert(newCategory);
  }

  update(categoryUpdate) {
    this.categoryRepository.update(categoryUpdate.id, categoryUpdate);
  }

  delete(id: string) {
    this.categoryRepository.delete(id);
  }
}
