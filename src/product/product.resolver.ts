import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddProductInput, FindByFieldInput } from './product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  async Products(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Query(() => Product)
  async Product(@Args('id') id: string): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @Query(() => [Product])
  async ProductsByField(
    @Args('data') data: FindByFieldInput,
  ): Promise<Product[]> {
    return await this.productService.findByField(data);
  }

  @Mutation(() => Product)
  async AddProduct(@Args('data') data: AddProductInput) {
    const createdProduct = await this.productService.create(data);
    return createdProduct;
  }
  @Mutation(() => Boolean)
  async RemoveProduct(@Args('id') id: string): Promise<boolean> {
    const { affected } = await this.productService.delete(id);
    return affected ? true : false;
  }
}
