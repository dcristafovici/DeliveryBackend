import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { CategoryRestaurant } from 'src/category/categoryRestaurant.entity';
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

    @InjectRepository(CategoryRestaurant)
    private CategoryRestaurantRepository: Repository<CategoryRestaurant>,
  ) {}

  async create(data: AddProductInput): Promise<Product> {
    const { categories, ...info } = data;

    const product = new Product();
    Object.assign(product, info);

    const categoriesInfo = await this.CategoryRepository.find({
      where: { id: In(categories) },
    });
    product.categories = categoriesInfo;

    const createdProduct = await this.ProductRepository.save(product);

    categories.map(async (category: any) => {
      const categoryExist = await this.CategoryRestaurantRepository.find({
        where: { restaurant: data.restaurant, category: category },
      });
      if (!categoryExist.length) {
        await this.CategoryRestaurantRepository.save({
          restaurant: data.restaurant,
          category,
          order: 0,
        });
      }
    });

    return createdProduct;
  }
  findAll(): Promise<Product[]> {
    return this.ProductRepository.find({ order: { id: 'DESC' } });
  }

  findByField(data: FindByFieldInput): Promise<Product[]> {
    const { field, value } = data;
    return this.ProductRepository.find({ where: { [field]: value } });
  }

  findOne(id: string): Promise<Product> {
    return this.ProductRepository.findOne(id);
  }

  findByIDs(data: any): Promise<Product[]> {
    return this.ProductRepository.find({ where: { id: In(data) } });
  }

  delete(id: string): Promise<any> {
    return this.ProductRepository.delete(id);
  }
}
