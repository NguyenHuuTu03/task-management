const Task = require("../../../models/tasks.model");

// [GET] /api/v1/tasks/
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  };
  const status = req.query.status;
  if (status) {
    find.status = status;
  }

  // Sort
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }
  // End Sort
  const tasks = await Task.find(find).sort(sort);
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