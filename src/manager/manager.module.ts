import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './manager.entity';
import { ManagerResolver } from './manager.resolver';
import { ManagerService } from './manager.service';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  providers: [ManagerService, ManagerResolver],
  exports: [ManagerService],
})
export class ManagerModule {}
