type ConnectionCursor = string;

export interface Edge<T> {
  node: T;
  cursor: ConnectionCursor;
}

export interface PageInfo {
  startCursor: ConnectionCursor | null;
  endCursor: ConnectionCursor | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface Connection<T> {
  edges: Array<Edge<T>>;
  pageInfo: PageInfo;
}
