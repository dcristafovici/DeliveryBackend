import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  FindByKeyInput,
  FindByResCatCombInput,
} from 'src/category/category.dto';
import { GraphqlRelayParams } from 'src/constants/GraphqlGeneralTypes';
import { connectionFromPromisedArray } from 'src/GraphQL/arrayConnection';
import {
  AddProductInput,
  ProductConnection,
  UpdateProductInput,
} from './product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  async findProducts(
    @Args('data') data: GraphqlRelayParams,
  ): Promise<ProductConnection> {
    return connectionFromPromisedArray(this.productService.find(data));
  }
  @Query(() => Product)
  async findOneProduct(@Args('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Query(() => [Product])
  async findByKeyProducts(
    @Args('data') data: FindByKeyInput,
  ): Promise<Product[]> {
    return this.productService.findByKey(data);
  }

  @Query(() => [Product])
  findByResCatCombProducts(
    @Args('data') data: FindByResCatCombInput,
  ): Promise<Product[]> {
    return this.productService.findByResCatComb(data);
  }

  @Mutation(() => Product)
  async createProduct(@Args('data') data: AddProductInput): Promise<Product> {
    return this.productService.create(data);
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id') id: string): Promise<boolean> {
    return this.productService.delete(id);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('data') data: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.update(id, data);
  }
}
