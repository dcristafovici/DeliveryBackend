import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  AddCategoryInput,
  FindByKeyInput,
  GraphqlGettingCategories,
  UpdateCategoryInput,
} from './category.dto';
import { Category } from './category.entity';
import slugify from 'slugify';
import {
  getGeneralResponse,
  GraphqlRequestParams,
} from 'src/constants/GraphqlGeneralTypes';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async find(data: GraphqlRequestParams): Promise<GraphqlGettingCategories> {
    const { limit, offset } = data;
    const items = await this.categoryRepository
      .createQueryBuilder('category')
      .limit(limit)
      .offset(offset)
      .getMany();

    const totalItems = await this.categoryRepository.count();
    return getGeneralResponse(items, totalItems);
  }

  findOne(id: string): Promise<Category> {
    return this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id })
      .getOne();
  }

  findByKey(data: FindByKeyInput): Promise<Category[]> {
    const { field, value } = data;
    return this.categoryRepository
      .createQueryBuilder('category')
      .where(`category.${field} = :${field}`, { [field]: value })
      .getMany();
  }

  findInData(data: Array<Category>): Promise<Category[]> {
    return this.categoryRepository.find({ where: { id: In(data) } });
  }

  async create(data: AddCategoryInput): Promise<Category> {
    const { name } = data;
    const existingCategory = await this.categoryRepository.findBy({ name });

    if (existingCategory.length) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'ALREADY_EXIST',
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

  async update(id: string, data: UpdateCategoryInput): Promise<Category> {
    const { name } = data;
    const existingCategory = await this.categoryRepository.findBy({ name });

    if (existingCategory.length) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'ALREADY_EXIST',
        },
        HttpStatus.CONFLICT,
      );
    }
    const slug = slugify(name, { lower: true });
    const updatedLocalEntity = await this.categoryRepository.preload({
      id,
      slug,
      ...data,
    });

    return this.categoryRepository.save(updatedLocalEntity);
  }
}
