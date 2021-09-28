import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddCategoryInput } from './category.dto';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [Category])
  async Categories(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Mutation(() => Category)
  async AddCategory(@Args('data') data: AddCategoryInput): Promise<Category> {
    return this.categoryService.create(data);
  }
}
