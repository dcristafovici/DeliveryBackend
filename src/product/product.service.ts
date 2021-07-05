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

  create(details: ProductDTO): Promise<Product> {
    return this.ProductRepository.save(details);
  }
  findOne(id: string): Promise<Product> {
    return this.ProductRepository.findOne(id);
  }

  findAll(): Promise<Product[]> {
    return this.ProductRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.ProductRepository.delete(id);
  }
}
