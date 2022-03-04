const express = require("express");
const app = express();
const { beginRequest } = require("./requests");
const router = require("./routers/routes");

app.use(express.json());

app.use("/", router);

app.listen(6000, () => {
  console.log("Compute and Storage app started.");

  //Post request to Rob's server
  beginRequest();
});
