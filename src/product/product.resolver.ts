import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddProductInput } from './product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  async Products(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Mutation(() => Product)
  async AddProduct(@Args('data') data: AddProductInput) {
    return await this.productService.create(data);
  }
}
