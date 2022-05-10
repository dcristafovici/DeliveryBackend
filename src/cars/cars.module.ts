import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars } from './cars.entity';
import { CarsResolver } from './cars.resolver';
import { CarsService } from './cars.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cars])],
  providers: [CarsService, CarsResolver],
  exports: [CarsService],
})
export class CarsModule {}
