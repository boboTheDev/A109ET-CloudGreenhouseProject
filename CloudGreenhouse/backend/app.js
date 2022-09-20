const express = require("express");
const isServerAliveController = require("./controllers/isServerAliveController");
const express_controllers = require("./controllers/express_controllers");
const camera_handlers = require("./controllers/camera_handlers");
const cors = require("cors");
const app = express();

const path = __dirname + "/front-end/";
app.use(express.static(path));

app.use(express.json({ limit: "10kb" }));
app.use(cors());

app.set("etag", false);
app.set("date", false);
app.set("connection", false);
app.set("keep-alive", false);

//frontend
app.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

app.get("/api/", isServerAliveController.isServerAlive);
app.post("/api", isServerAliveController.isServerAlivePost);
app.post("/api/db_log", express_controllers.db_log);
app.get("/api/get_db_log", express_controllers.get_db_log);

app.post("/api/commands", express_controllers.store_command);
app.get("/api/commands", express_controllers.get_command);

app.post("/api/conditions", express_controllers.post_conditions);
app.get("/api/conditions", express_controllers.get_conditions);

app.post("/api/camera_data", camera_handlers.take_data);

module.exports = app;
