export const getListAndCount = (query: any, page: number, pageSize: number) => {
  return query
    .skip((page - 1) * pageSize)
    .take(pageSize)
    .getManyAndCount();
};
