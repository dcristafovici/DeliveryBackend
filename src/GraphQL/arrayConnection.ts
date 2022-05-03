import { Connection } from './arrayConnectionTypes';

export const connectionFromPromisedArray = (
  dataPromise: Promise<ReadonlyArray<any>>,
): Promise<Connection<any>> =>
  dataPromise.then((data) => connectionFromArray(data));

const connectionFromArray = (data: ReadonlyArray<any>): Connection<any> => {
  const firstElement = data[0].id;
  const lastElement = data[data.length - 1].id;
  const edges = data.map((item) => ({ cursor: item.id, node: item }));
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
