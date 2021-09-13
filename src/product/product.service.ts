import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDTO } from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private ProductRepository: Repository<Product>,
  ) {}

  create(data: ProductDTO): Promise<Product> {
    return this.ProductRepository.save(data);
  }
  findAll(): Promise<Product[]> {
    return this.ProductRepository.find();
  }
}
