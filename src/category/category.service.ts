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
import { GraphqlRelayParams } from 'src/constants/GraphqlGeneralTypes';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async find(data: GraphqlRelayParams): Promise<Category[]> {
    const { first = null, after = '0' } = data;
    // TODO: To investigate this workaround ( if we do not add + 1 to timestamp, the service takes the record that contains same timestamp as after constant )
    const stringToTimestamp = parseFloat(after) + 1;
    const cursor = new Date(stringToTimestamp);
    // TODO: If we have 0 items, backend is down. Should be fixed.
    return this.categoryRepository
      .createQueryBuilder('category')
      .where('category.created_at > :cursor', { cursor })
      .limit(first)
      .getMany();
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
