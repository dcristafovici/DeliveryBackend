import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GraphQLUpload } from 'graphql-upload';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { MediaModule } from './media/media.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ProductController } from './product/product.controller';

@Module({
  imports: [
    DatabaseModule,
    CategoryModule,
    MediaModule,
    RestaurantModule,
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
  controllers: [AppController, ProductController],
  providers: [AppService],
})
export class AppModule {}
