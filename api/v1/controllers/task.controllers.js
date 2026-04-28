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

// [PATCH] /api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {

  try {
    const id = req.params.id;
    const status = req.body.status;
    const tasks = await Task.updateOne({
      _id: id
    }, {
      status: status
    });
    res.json({
      code: "200",
      message: "Cập nhật trạng thái thành công!"
    });
  } catch (error) {
    res.json({
      code: "500",
      message: "Cập nhật trạng thái thất bại!"
    });
  }
}

// [PATCH] /api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
  try {
    const {
      ids,
      key,
      value
    } = req.body;
    switch (key) {
      case "status":
        await Task.updateMany({
          _id: {
            $in: ids
          }
        }, {
          status: value
        });
        res.json({
          code: "200",
          message: "Cập nhật trạng thái thành công!"
        });
        break;
      case "deleted":
        await Task.updateMany({
          _id: {
            $in: ids
          }
        }, {
          deleted: value
        });
        res.json({
          code: "200",
          message: "Xoá bản ghi thành công!"
        });
        break;

      default:
        res.json({
          code: "400",
          message: "Không tìm thấy!"
        });
        break;
    }

  } catch (error) {
    res.json({
      code: "500",
      message: "Xoá bản ghi thất bại!"
    });
  }
}

// [POST] /api/v1/tasks/create
module.exports.create = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const task = new Task(req.body);
    const data = await task.save();
    res.json({
      code: "200",
      message: "Tạo mới thành công!",
      data: data
    });

  } catch (error) {
    res.json({
      code: "400",
      message: "Tạo mới thất bại!"
    });
  }
}

// [PATCH] /api/v1/tasks/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.updateOne({
      _id: id
    }, req.body);
    res.json({
      code: "200",
      message: "Cập nhật thành công!"
    });

  } catch (error) {
    res.json({
      code: "400",
      message: "Cập nhật thất bại!"
    });
  }
}

// [PATCH] /api/v1/tasks/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.updateOne({
      _id: id
    }, {
      deleted: true,
      deletedAt: new Date()
    });
    res.json({
      code: "200",
      message: "Xoá bản ghi thành công!"
    });

  } catch (error) {
    res.json({
      code: "400",
      message: "Xoá bản ghi thất bại!"
    });
  }
}