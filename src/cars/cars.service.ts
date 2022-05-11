import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindByKeyInput } from 'src/category/category.dto';
import { Repository } from 'typeorm';
import { AddCarsInput, UpdateCarsInput } from './cars.dto';
import { Cars } from './cars.entity';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Cars)
    private carsRepository: Repository<Cars>,
    private httpService: HttpService,
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

  findPosition(address: string): Observable<AxiosResponse<any>> {
    return this.httpService
      .get(
        `http://api.positionstack.com/v1/forward?access_key=ec5b4a140f793193791572c66c69b599&query=${address}`,
      )
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          return axiosResponse.data;
        }),
      );
  }
}
