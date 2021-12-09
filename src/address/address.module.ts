import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';

@Module({
  imports: [HttpModule],
  providers: [AddressService, AddressResolver],
  exports: [AddressService],
})
export class AddressModule {}
