import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  AddCategoryInput,
  EditCategoryInput,
  FindByKeyInput,
} from './category.dto';
import { Category } from './category.entity';
import { CategoryRestaurantService, CategoryService } from './category.service';
import { CategoryRestaurant } from './categoryRestaurant.entity';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [Category])
  async Categories(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Query(() => Category)
  async CategoryByID(@Args('id') id: string): Promise<Category> {
    return await this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  async AddCategory(@Args('data') data: AddCategoryInput): Promise<Category> {
    return this.categoryService.create(data);
  }
  @Mutation(() => Boolean)
  async UpdateCategory(
    @Args('id') id: string,
    @Args('newData') newData: EditCategoryInput,
  ): Promise<boolean> {
    return await this.categoryService.update(id, newData);
  }
}

@Resolver(() => CategoryRestaurant)
export class CategoryRestaurantResolver {
  constructor(private categoryRestaurantService: CategoryRestaurantService) {}

  @Query(() => [CategoryRestaurant])
  async CategoryOrderfindByKey(
    @Args('data') data: FindByKeyInput,
  ): Promise<CategoryRestaurant[]> {
    return await this.categoryRestaurantService.categoryOrderfindByKey(data);
  }
}
