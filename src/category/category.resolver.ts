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
  constructor(private categoroService: CategoryService) {}

  @Query(() => [Category])
  async findCategories(): Promise<Category[]> {
    return this.categoroService.find();
  }
  @Query(() => Category)
  async findOneCategory(@Args('id') id: string): Promise<Category> {
    return this.categoroService.findOne(id);
  }

  @Query(() => [Category])
  async findByKeyCategory(
    @Args('data') data: FindByKeyInput,
  ): Promise<Category[]> {
    return this.categoroService.findByKey(data);
  }

  @Mutation(() => Category)
  async createCategory(
    @Args('data') data: AddCategoryInput,
  ): Promise<Category> {
    return this.categoroService.create(data);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Args('id') id: string): Promise<boolean> {
    return this.categoroService.delete(id);
  }

  @Mutation(() => Boolean)
  async updateCategory(
    @Args('id') id: string,
    @Args('data') data: UpdateCategoryInput,
  ): Promise<boolean> {
    return this.categoroService.update(id, data);
  }
}
