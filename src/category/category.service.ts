import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AddCategoryInput,
  EditCategoryInput,
  FindByKeyInput,
} from './category.dto';
import { Category } from './category.entity';
import { CategoryRestaurant } from './categoryRestaurant.entity';

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
    return this.CategoryRepository.save(data);
  }

  findAll(): Promise<Category[]> {
    return this.CategoryRepository.find();
  }

  findOne(id: string): Promise<Category> {
    return this.CategoryRepository.findOne(id);
  }
  async update(id: string, newData: EditCategoryInput): Promise<boolean> {
    const { affected } = await this.CategoryRepository.update(id, newData);
    return affected ? true : false;
  }
}

@Injectable()
export class CategoryRestaurantService {
  constructor(
    @InjectRepository(CategoryRestaurant)
    private CategoryRestaurantRepository: Repository<CategoryRestaurant>,
  ) {}

  categoryOrderfindByKey({
    field,
    value,
  }: FindByKeyInput): Promise<CategoryRestaurant[]> {
    return this.CategoryRestaurantRepository.find({
      where: { [field]: value },
      order: { order: 'ASC' },
    });
  }
}
