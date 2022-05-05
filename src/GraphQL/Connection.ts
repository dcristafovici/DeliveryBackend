import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Connection as RelayConnection,
  PageInfo as RelayPageInfo,
  Edge as RelayEdge,
} from './arrayConnectionTypes';

export function Connection<GraphQLObject>(
  GenericClass?: Type<GraphQLObject>,
): any {
  @ObjectType(`${GenericClass.name}PageInfo`, { isAbstract: true })
  class PageInfo implements RelayPageInfo {
    @Field(() => String, { nullable: true })
    startCursor: string;

    @Field(() => String, { nullable: true })
    endCursor: string;

    @Field(() => Boolean, { nullable: false })
    hasPreviousPage: boolean;

    @Field(() => Boolean, { nullable: false })
    hasNextPage: boolean;
  }

  @ObjectType(`${GenericClass.name}Edge`, { isAbstract: true })
  abstract class Edge<GraphQLObject> implements RelayEdge<GraphQLObject> {
    @Field(() => GenericClass, { nullable: false })
    node: GraphQLObject;

    @Field(() => String, { nullable: false })
    cursor: string;
  }

  @ObjectType({ isAbstract: true })
  abstract class IConnection implements RelayConnection<GraphQLObject> {
    @Field(() => [Edge], { nullable: false })
    edges: Array<RelayEdge<GraphQLObject>>;

    @Field(() => PageInfo, { nullable: false })
    pageInfo: PageInfo;
  }

  return IConnection;
}
