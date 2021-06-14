import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [DatabaseModule, RestaurantModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
