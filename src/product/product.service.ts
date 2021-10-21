import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { In, Repository } from 'typeorm';
import { AddProductInput, FindByFieldInput } from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private ProductRepository: Repository<Product>,
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
  ) {}

  async create(data: AddProductInput): Promise<Product> {
    const { categories, ...info } = data;
    const product = new Product();
    Object.assign(product, info);
    const categoriesInfo = await this.CategoryRepository.find({
      where: { id: In(categories) },
    });
    product.categories = categoriesInfo;
    return this.ProductRepository.save(product);
  }
  findAll(): Promise<Product[]> {
    return this.ProductRepository.find();
  }

  findByField(data: FindByFieldInput): Promise<Product[]> {
    const { field, value } = data;
    return this.ProductRepository.find({ where: { [field]: value } });
  }

  findByIDs(data: any): Promise<Product[]> {
    return this.ProductRepository.find({ where: { id: In(data) } });
  }
}
