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
import { GraphQLGeneralRequest } from 'src/constants/GraphqlGeneralTypes';
import { ListResult } from 'src/constants/TypeormGeneralTypes';
import { getListAndCount } from 'src/utils/getListAndCount';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async find(data: GraphQLGeneralRequest): Promise<ListResult<Category>> {
    const { page = 1, pageSize = 0 } = data;
    const query = this.categoryRepository
      .createQueryBuilder('category')
      .orderBy('category.created_at', 'ASC');
    const [list, count] = await getListAndCount(query, page, pageSize);
    return {
      list,
      page,
      pageSize,
      count,
    };
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
