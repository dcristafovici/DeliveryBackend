import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddProductInput, FindByFieldInput } from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private ProductRepository: Repository<Product>,
  ) {}

  create(data: AddProductInput): Promise<Product> {
    return this.ProductRepository.save(data);
  }
  findAll(): Promise<Product[]> {
    return this.ProductRepository.find();
  }

  findByField(data: FindByFieldInput): Promise<Product[]> {
    const { field, value } = data;
    return this.ProductRepository.find({ where: { [field]: value } });
  }
}
