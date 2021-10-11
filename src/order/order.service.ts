import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { AddOrderInput } from './order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    @Inject(forwardRef(() => ProductService))
    private OrderRepository: Repository<Order>,
    private productService: ProductService,
  ) {}

  async create(data: AddOrderInput): Promise<Order> {
    const { cart, ...info } = data;
    const order = new Order();
    Object.assign(order, info);
    const cartID = cart.map((item) => item.id);
    console.log(cartID);
    const products = await this.productService.findByIDs(cartID);
    order.products = products;
    return this.OrderRepository.save(order);
  }

  getOrderByUser(user: string): Promise<Order[]> {
    return this.OrderRepository.find({ where: { user } });
  }
}
