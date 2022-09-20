const catchAsync = require("../utils/catchAsync");
exports.isServerAlive = catchAsync(async (req, res, next) => {
  console.log(req);
  res.status(200).json({
    status: "super",
  });
});

exports.isServerAlivePost = catchAsync(async (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    status: "received",
  });
});
