const db = require("../models");
const catchAsync = require("../utils/catchAsync");

exports.db_log = catchAsync(async (req, res, next) => {
  const new_data = await db.Data_collect.build({
    temperature: req.body.temp,
    humidity: req.body.humi,
    soil_moisture: req.body.soil,
    water_tank: req.body.water,
    lighting: req.body.light,
  }).save();
  res.status(200).json({
    status: "DB_LOGGED",
  });
});

exports.get_db_log = catchAsync(async (req, res, next) => {
  const conditions = await db.Data_collect.findOne({
    limit: 1,
    order: [["created_at", "DESC"]],
  });

  res.status(200).json({
    data: conditions,
  });
});

exports.get_command = catchAsync(async (req, res, next) => {
  const command = await db.Command.findOne({
    limit: 1,
    order: [["created_at", "DESC"]],
  });
  if (command) {
    let command_string = [
      command["light"],
      command["pump"],
      command["fans"],
      command["camera"],
    ].join("-");
    res.removeHeader("X-Powered-By");
    res.removeHeader("Connection");
    res.removeHeader("Keep-Alive");
    // res.set("command_id", command_string);
    res.status(200).json({
      data: command_string,
    });
  } else {
    res.status(500);
  }
});

exports.store_command = catchAsync(async (req, res, next) => {
  await db.Command.destroy({
    truncate: true,
  });
  await db.Command.build({
    light: req.body.light,
    pump: req.body.pump,
    camera: req.body.camera,
    fans: req.body.fans,
    status: 1,
  }).save();
  res.status(200).json({
    status: "CMD_LOGGED",
  });
});

exports.post_conditions = catchAsync(async (req, res, next) => {
  await db.Condition.destroy({
    truncate: true,
  });
  const new_conditions = await db.Condition.build({
    temp_thres: req.body.temp_thres,
    humidity_thres: req.body.humidity_thres,
    soil_thres: req.body.soil_thres,
    water_thres: req.body.water_thres,
    light_thres: req.body.light_thres,
  }).save();
  if (new_conditions) {
    res.status(200).json({
      status: "POSTED",
    });
  } else {
    res.status(500);
  }
});

exports.get_conditions = catchAsync(async (req, res, next) => {
  const conditions = await db.Condition.findOne({
    limit: 1,
    order: [["created_at", "DESC"]],
  });
  if (conditions) {
    let condition_string = [
      conditions["temp_thres"],
      conditions["humidity_thres"],
      conditions["soil_thres"],
      conditions["water_thres"],
      conditions["light_thres"],
    ].join("-");
    res.status(200).json({
      data: condition_string,
    });
  } else {
    res.status(500);
  }
});
