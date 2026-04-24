const Task = require("../../../models/tasks.model");
const paginationHelper = require("../../../helpers/pagination");
const searchHelper = require("../../../helpers/search");

// [GET] /api/v1/tasks/
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  };
  const status = req.query.status;
  if (status) {
    find.status = status;
  }

  // Search
  const objectSearch = searchHelper.objectSearch(req.query);
  if (req.query.keyword) {
    find.title = objectSearch.regex;
  }
  // End Search

  // Sort
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }
  // End Sort

  // Pagination
  const objectPagination = {
    currentPage: 1,
    limitItem: 2,
  }
  const countRecords = await Task.countDocuments();
  const pagination = paginationHelper.objectPagination(objectPagination, req.query, countRecords);
  // End Pagination
  const tasks = await Task.find(find).sort(sort).limit(pagination.limitItem).skip(pagination.skipItem);
  res.json(tasks);
}


// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const tasks = await Task.findOne({
      _id: req.params.id,
      deleted: false
    });
    res.json(tasks);
  } catch (error) {
    res.json("Không tìm thấy!");
  }
}