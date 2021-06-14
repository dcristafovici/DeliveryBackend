import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDTO } from './category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private groupRepository: Repository<Category>,
  ) {}

  create(details: CategoryDTO): Promise<Category> {
    return this.groupRepository.save(details);
  }

  findOne(id: string): Promise<Category> {
    return this.groupRepository.findOne(id);
  }

  findAll(): Promise<Category[]> {
    return this.groupRepository.find();
  }
}
