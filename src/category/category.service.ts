import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  AddCategoryInput,
  FindByKeyInput,
  UpdateCategoryInput,
} from './category.dto';
import { Category } from './category.entity';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  find(): Promise<Category[]> {
    return this.categoryRepository.createQueryBuilder('category').getMany();
  }

  findOne(id: string): Promise<Category> {
    return this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id })
      .getOne();
  }

  findByKey(data: FindByKeyInput): Promise<Category[]> {
    const { field, value } = data;
    return this.categoryRepository.find({ where: { [field]: value } });
  }

  findInData(data: Array<Category>): Promise<Category[]> {
    return this.categoryRepository.find({ where: { id: In(data) } });
  }

  async create(data: AddCategoryInput): Promise<Category> {
    const { name } = data;
    const existingCategory = await this.categoryRepository.find({ name });

    if (existingCategory.length) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          errorCode: 'ALREADY_EXIST',
        },
        HttpStatus.CONFLICT,
      );
    }
    const slug = slugify(name, { lower: true });

    return this.categoryRepository.save({ name, slug });
  }

  async delete(id: string): Promise<boolean> {
    const { affected } = await this.categoryRepository
      .createQueryBuilder('category')
      .delete()
      .where('id = :id', { id })
      .execute();
    return affected ? true : false;
  }

  async update(id: string, data: UpdateCategoryInput): Promise<boolean> {
    const { affected } = await this.categoryRepository
      .createQueryBuilder('category')
      .update(Category)
      .set({ ...data })
      .where('id = :id', { id })
      .execute();
    return affected ? true : false;
  }
}
