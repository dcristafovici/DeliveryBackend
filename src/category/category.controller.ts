import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Post('add')
  @HttpCode(201)
  createCategory(@Body() newCategory: any) {
    this.categoryService.create(newCategory);
  }

  @Post('update')
  @HttpCode(201)
  updateCategory(@Body() categoryToUpdate: any) {
    this.categoryService.update(categoryToUpdate);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  deleteCategory(@Param('id') id: string) {
    this.categoryService.delete(id);
  }
}
