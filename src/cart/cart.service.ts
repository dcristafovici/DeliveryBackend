import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private CartRepository: Repository<Cart>,
  ) {}

  createCart(data: any): Promise<Cart[]> {
    return this.CartRepository.save(data);
  }
}
