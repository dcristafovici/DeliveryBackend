import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'admin',
      password: '1234%asd',
      database: 'Delivery',
      entities: [Category],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
