import { Injectable } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { DataResultsInterface, SuggestElementInterface } from './address.dto';
import { AddressService } from './address.service';

@Injectable()
export class AddressResolver {
  constructor(private addressService: AddressService) {}

  @Query(() => Boolean)
  async findAll(): Promise<any> {
    lastValueFrom(this.addressService.findPossibleAddresses())
      .then((response: AxiosResponse<DataResultsInterface>) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    return true;
  }
}
