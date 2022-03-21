import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { ProductModule } from './product/product.module';
import { AddressModule } from './address/address.module';
import { UserModule } from './user/user.module';
import { OTPModule } from './otp/otp.module';
import { OrderModule } from './order/order.module';
import { MailModule } from './mail/mail.module';
import { ManagerModule } from './manager/manager.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    CategoryModule,
    MediaModule,
    RestaurantModule,
    ProductModule,
    ProductModule,
    AddressModule,
    UserModule,
    OTPModule,
    OrderModule,
    ManagerModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      resolvers: {
        Upload: GraphQLUpload,
      },
    }),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
