import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Product } from './Product.entity';
import { ProductService } from './Product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => Product)
  async Product(@Args('id') id: string): Promise<Product> {
    return await this.productService.findOne(id);
  }
  @Query(() => [Product])
  async Products(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('price') price: number,
    @Args('image') image: string,
  ): Promise<Product> {
    return await this.productService.create({
      name,
      description,
      price,
      image,
    });
  }

  @Mutation(() => Boolean)
  async removeProduct(@Args('id') id: string) {
    await this.productService.remove(id);
    return true;
  }
}
