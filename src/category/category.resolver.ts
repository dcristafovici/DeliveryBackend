import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => Category)
  async Category(@Args('id') id: string): Promise<Category> {
    return await this.categoryService.findOne(id);
  }
  @Query(() => [Category])
  async Categories(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Mutation(() => Category)
  async createCategory(
    @Args('name') name: string,
    @Args('description') description: string,
  ): Promise<Category> {
    return await this.categoryService.create({ name, description });
  }
}
