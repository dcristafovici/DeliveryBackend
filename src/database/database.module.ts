import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'admin',
      password: '1234%asd',
      database: 'Delivery',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
