import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';

@Injectable()
export class AddressService {
  constructor(private httpService: HttpService) {}
  findPossibleAddresses(address: string): Observable<AxiosResponse<any>> {
    const DaDataConfig: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token ' + process.env.ADDRESS_TOKEN,
      },
    };
    return this.httpService
      .post(process.env.ADDRESS_URL, { query: address }, DaDataConfig)
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          return axiosResponse.data;
        }),
      );
  }
}
