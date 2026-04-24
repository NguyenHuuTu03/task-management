const Task = require("../../../models/tasks.model");

// [GET] /api/v1/tasks/
module.exports.index = async (req, res) => {
  const tasks = await Task.find({
    deleted: false
  });
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