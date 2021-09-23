import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { RestaurantModule } from './restaurant/restaurant.module';
import { DatabaseModule } from './database/database.module';
import { GraphQLUpload } from 'graphql-upload';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { MediaModule } from './media/media.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule,
    RestaurantModule,
    CategoryModule,
    ProductModule,
    MediaModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      resolvers: {
        Upload: GraphQLUpload,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
