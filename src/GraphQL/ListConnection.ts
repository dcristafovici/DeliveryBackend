import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { ListConnection as RelayListConnection } from './listConnectionTypes';

export function ListConnection<GraphQLObject>(
  GenericClass?: Type<GraphQLObject>,
): any {
  @ObjectType(`${GenericClass.name}Edge`, { isAbstract: true })
  @ObjectType({ isAbstract: true })
  abstract class IListConnection implements RelayListConnection<GraphQLObject> {
    @Field(() => [GenericClass], { nullable: false })
    list: Array<GraphQLObject>;

    @Field(() => Number, { nullable: false })
    page: number;

    @Field(() => Number, { nullable: false })
    pageSize: number;

    @Field(() => Number, { nullable: false })
    count: number;
  }

  return IListConnection;
}
