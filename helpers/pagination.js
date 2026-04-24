module.exports.objectPagination = (objectPagination, query, countRecords) => {
  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }
  if (query.limit) {
    objectPagination.limitItem = parseInt(query.limit);
  }
  objectPagination.totalPage = Math.ceil(countRecords / objectPagination.limitItem);
  objectPagination.skipItem = (objectPagination.currentPage - 1) * objectPagination.limitItem;
  return objectPagination;
}