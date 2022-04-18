import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GraphqlRequestParams } from 'src/constants/GraphqlGeneralTypes';
import {
  AddCategoryInput,
  FindByKeyInput,
  GraphqlGettingCategories,
  UpdateCategoryInput,
} from './category.dto';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => GraphqlGettingCategories)
  async findCategories(
    @Args('data') data: GraphqlRequestParams,
  ): Promise<GraphqlGettingCategories> {
    return this.categoryService.find(data);
  }
  @Query(() => Category)
  async findOneCategory(@Args('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Query(() => [Category])
  async findByKeyCategories(
    @Args('data') data: FindByKeyInput,
  ): Promise<Category[]> {
    return this.categoryService.findByKey(data);
  }

  @Mutation(() => Category)
  async createCategory(
    @Args('data') data: AddCategoryInput,
  ): Promise<Category> {
    return this.categoryService.create(data);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Args('id') id: string): Promise<boolean> {
    return this.categoryService.delete(id);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('id') id: string,
    @Args('data') data: UpdateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.update(id, data);
  }
}
