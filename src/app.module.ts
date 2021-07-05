import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { GroupModule } from './group/group.module';
import { CategoryModule } from './category/category.module';
import { DatabaseModule } from './database/database.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MediaModule } from './media/media.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    DatabaseModule,
    CategoryModule,
    RestaurantModule,
    GroupModule,
    MediaModule,
    ProductModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      uploads: {
        maxFileSize: 10000000, // 10 MB
        maxFiles: 10,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
