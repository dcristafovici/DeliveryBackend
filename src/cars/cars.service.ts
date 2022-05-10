import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindByKeyInput } from 'src/category/category.dto';
import { Repository } from 'typeorm';
import { AddCarsInput } from './cars.dto';
import { Cars } from './cars.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Cars)
    private carsRepository: Repository<Cars>,
  ) {}

  find(): Promise<Cars[]> {
    return this.carsRepository.createQueryBuilder('cars').getMany();
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
}
