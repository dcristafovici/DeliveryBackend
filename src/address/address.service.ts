import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';

@Injectable()
export class AddressService {
  constructor(private httpService: HttpService) {}

  findPossibleAddresses(): Observable<AxiosResponse<any>> {
    const url =
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
    const data = { query: 'Moscow Generala Ermolova' };
    return this.httpService.post(url, data).pipe(
      map((axiosResponse: AxiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }
}
