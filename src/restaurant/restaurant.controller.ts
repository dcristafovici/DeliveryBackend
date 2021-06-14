import {
  Controller,
  Get,
  Post,
  Delete,
  HttpCode,
  Param,
  Body,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant.entity';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Get('all')
  async findAll(): Promise<Restaurant[]> {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Restaurant> {
    return this.restaurantService.findOne(id);
  }

  @Post('add')
  @HttpCode(201)
  createCategory(@Body() newCategory: any) {
    this.restaurantService.create(newCategory);
  }

  @Post('update')
  @HttpCode(201)
  updateCategory(@Body() categoryToUpdate: any) {
    this.restaurantService.update(categoryToUpdate);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  deleteCategory(@Param('id') id: string) {
    this.restaurantService.delete(id);
  }
}
