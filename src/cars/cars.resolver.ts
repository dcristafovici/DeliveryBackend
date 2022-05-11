import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddCarsInput, UpdateCarsInput } from './cars.dto';
import { Cars } from './cars.entity';
import { CarsService } from './cars.service';

@Resolver(() => Cars)
export class CarsResolver {
  constructor(private carsService: CarsService) {}

  @Query(() => [Cars])
  async findCars(): Promise<Cars[]> {
    return this.carsService.find();
  }

  @Query(() => Cars)
  async findOneCar(@Args('id') id: string): Promise<Cars> {
    return this.carsService.findOne(id);
  }

  @Mutation(() => Cars)
  async createCars(@Args('data') data: AddCarsInput): Promise<Cars> {
    return this.carsService.create(data);
  }

  @Mutation(() => Cars)
  async updateCars(
    @Args('id') id: string,
    @Args('data') data: UpdateCarsInput,
  ): Promise<Cars> {
    return this.carsService.update(id, data);
  }

  @Mutation(() => Boolean)
  async deleteCars(@Args('id') id: string): Promise<boolean> {
    return this.carsService.delete(id);
  }
}
