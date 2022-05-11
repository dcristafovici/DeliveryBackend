import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindByKeyInput } from 'src/category/category.dto';
import { Repository } from 'typeorm';
import { AddCarsInput, UpdateCarsInput } from './cars.dto';
import { Cars } from './cars.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Cars)
    private carsRepository: Repository<Cars>,
  ) {}

  find(): Promise<Cars[]> {
    return this.carsRepository
      .createQueryBuilder('cars')
      .orderBy('created_at')
      .getMany();
  }

  findOne(id: string): Promise<Cars> {
    return this.carsRepository
      .createQueryBuilder('cars')
      .where('cars.id = :id', { id })
      .getOne();
  }

  findByKey(data: FindByKeyInput): Promise<Cars[]> {
    const { field, value } = data;
    return this.carsRepository
      .createQueryBuilder('cars')
      .where(`cars.${field} = :${field}`, { [field]: value })
      .getMany();
  }

  create(data: AddCarsInput): Promise<Cars> {
    return this.carsRepository.save(data);
  }

  async update(id: string, data: UpdateCarsInput): Promise<Cars> {
    const updatedLocalEntity = await this.carsRepository.preload({
      id,
      ...data,
    });
    return this.carsRepository.save(updatedLocalEntity);
  }

  async delete(id: string): Promise<boolean> {
    const { affected } = await this.carsRepository
      .createQueryBuilder('category')
      .delete()
      .where('id = :id', { id })
      .execute();
    return affected ? true : false;
  }
}
