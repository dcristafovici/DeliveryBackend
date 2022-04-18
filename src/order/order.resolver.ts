import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindByKeyInput } from 'src/category/category.dto';
import { GraphqlRequestParams } from 'src/constants/GraphqlGeneralTypes';
import { AddOrderInput, GraphqlGettingOrders } from './order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { UpdatePaymentStatusDTO } from './OrderPayment/order-payment.dto';
import { OrderPaymentService } from './OrderPayment/order-payment.service';

@Resolver()
export class OrderResolver {
  constructor(
    private orderService: OrderService,
    private orderPaymentService: OrderPaymentService,
  ) {}

  @Query(() => GraphqlGettingOrders)
  async findOrders(
    @Args('data') data: GraphqlRequestParams,
  ): Promise<GraphqlGettingOrders> {
    return this.orderService.find(data);
  }
  @Query(() => Order)
  async findOneOrder(@Args('id') id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Query(() => [Order])
  async findByKeyOrders(@Args('data') data: FindByKeyInput): Promise<Order[]> {
    return this.orderService.findByKey(data);
  }

  @Mutation(() => Order)
  async createOrder(@Args('data') data: AddOrderInput): Promise<Order> {
    return this.orderService.create(data);
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Args('id') id: string): Promise<boolean> {
    return this.orderService.delete(id);
  }

  @Mutation(() => Boolean)
  async updatePaymentStatus(
    @Args('data') data: UpdatePaymentStatusDTO,
  ): Promise<boolean> {
    const updateResult = await this.orderPaymentService.updateStatus(data);
    const { affected } = updateResult;
    return affected ? true : false;
  }
}
