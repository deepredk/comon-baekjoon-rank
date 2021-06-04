const express = require("express");
const { apiRouter } = require("./routers/apiRouter");
const { startCrawling } = require("./controllers/crawler");

const app = express();

app.use(express.static("dist"));
app.use("/api", apiRouter);

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);

startCrawling();
