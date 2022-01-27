import { AxiosRequestConfig } from 'axios';
import { v4 as uuid } from 'uuid';

export const processPaymentConfig: AxiosRequestConfig = {
  auth: {
    username: process.env.PAYMENT_SHOP_ID,
    password: process.env.PAYMENT_SECRET_KEY,
  },
  headers: {
    'Idempotence-Key': uuid(),
  },
};
