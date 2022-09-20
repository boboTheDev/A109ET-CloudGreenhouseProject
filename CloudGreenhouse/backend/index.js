const app = require("./app");

const express_port = process.env.EXPRESS_PORT || 80;

app.listen(express_port, () => {
  console.log("EXPRESS server on ", express_port);
});