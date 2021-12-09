import { Injectable } from '@nestjs/common';
import { Args, Query } from '@nestjs/graphql';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { DataResultsInterface, SuggestionEntity } from './address.dto';
import { AddressService } from './address.service';

@Injectable()
export class AddressResolver {
  constructor(private addressService: AddressService) {}

  @Query(() => [SuggestionEntity])
  async findPossibleAddresses(
    @Args('address') address: string,
  ): Promise<SuggestionEntity> {
    return lastValueFrom(this.addressService.findPossibleAddresses(address))
      .then((response: AxiosResponse<DataResultsInterface>) => {
        const suggestions = response['suggestions'];
        return suggestions;
      })
      .catch((err) => console.log(err));
  }
}
