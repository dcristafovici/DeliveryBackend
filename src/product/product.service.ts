import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindByKeyInput } from 'src/category/category.dto';
import { Repository } from 'typeorm';
import { AddProductInput } from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  find(): Promise<Product[]> {
    return this.productRepository.createQueryBuilder('product').getMany();
  }

  findOne(id: string): Promise<Product> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.media', 'media')
      .where('product.id = :id', { id })
      .getOne();
  }

  findByKey(data: FindByKeyInput): Promise<Product[]> {
    const { field, value } = data;
    return this.productRepository.find({ where: { [field]: value } });
  }

  create(data: AddProductInput): Promise<Product> {
    console.log(data);
    return this.productRepository.save(data);
  }

  async delete(id: string): Promise<boolean> {
    const { affected } = await this.productRepository
      .createQueryBuilder('product')
      .delete()
      .where('id = :id', { id })
      .execute();
    return affected ? true : false;
  }
}
