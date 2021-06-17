import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { GroupModule } from './group/group.module';
import { CategoryModule } from './category/category.module';
import { DatabaseModule } from './database/database.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MediaModule } from './media/media.module';
@Module({
  imports: [
    DatabaseModule,
    CategoryModule,
    RestaurantModule,
    GroupModule,
    MediaModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      uploads: {
        maxFileSize: 10000000, // 10 MB
        maxFiles: 5,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
