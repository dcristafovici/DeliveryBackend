import { Connection } from './arrayConnectionTypes';

export const connectionFromPromisedArray = (
  dataPromise: Promise<ReadonlyArray<any>>,
): Promise<Connection<any>> =>
  dataPromise.then((data) => connectionFromArray(data));

const connectionFromArray = (data: ReadonlyArray<any>): Connection<any> => {
  const firstElement = data[0].created_at;
  const lastElement = data[data.length - 1].created_at;
  const edges = data.map((item) => ({ cursor: item.created_at, node: item }));
  return {
    edges,
    pageInfo: {
      startCursor: firstElement,
      endCursor: lastElement,
      hasPreviousPage: false,
      hasNextPage: false,
    },
  };
};
