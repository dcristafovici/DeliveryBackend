import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import {
  AddCategoryInput,
  FindByKeyInput,
  UpdateCategoryInput,
} from './category.dto';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [Category])
  async findCategories(): Promise<Category[]> {
    return this.categoryService.find();
  }
  @Query(() => Category)
  async findOneCategory(@Args('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Query(() => [Category])
  async findByKeyCategory(
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

  @Mutation(() => Boolean)
  async updateCategory(
    @Args('id') id: string,
    @Args('data') data: UpdateCategoryInput,
  ): Promise<boolean> {
    return this.categoryService.update(id, data);
  }
}
