const db = require("../models");
const catchAsync = require("../utils/catchAsync");

exports.data_collect = function (data_chunk) {
  let data_arr = data_chunk.split(" ");
  let data_obj = {};
  let data_length = data_arr.length - 2;

  for (let i = 0; i <= data_length; i = i + 2) {
    data_obj[data_arr[i]] = parseInt(data_arr[i + 1]);
  }
  console.log(data_obj);
  return data_obj;
};

exports.log_data = async function (data_obj) {
  try {
    const new_data = await db.Data_collect.build({
      temperature: data_obj.temperature,
      humidity: data_obj.humidity,
      soil_moisture: data_obj.soil_moisture,
      water_tank: data_obj.water_tank,
      lighting: data_obj.lighting,
    }).save();
    return "LOG OK";
  } catch (error) {
    console.log(error);
    return "LOG ERR";
  }
};

exports.check_command = async function () {
  try {
    const command = await db.Command.find({
      limit: 1,
      order: [["created_at", "DESC"]],
    });
    let command_string = [
      "CHECK:",
      command["light"],
      command["pump"],
      command["fans"],
      command["camera"],
    ].join("-");
    return command_string;
  } catch (error) {
    console.log(error);
    return "CMD ERR";
  }
};

exports.action_update = async function (incoming_id) {
  try {
    const updated_command = await db.Command.update(
      { action: 1 },
      { where: { id: incoming_id }, returning: true }
    );
    if (!updated_command) {
      return "UPDATE FAIL";
    } else {
      return "UPDATE OK";
    }
  } catch (error) {
    console.log(error);
    return "ATN ERR";
  }
};

// exports.test_feedback = async function () {
//   try {
//     return
//   } catch (error) {
//     console.log(error);
//   }
// }
