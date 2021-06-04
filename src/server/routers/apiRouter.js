const express = require("express");
const {
  getTeamRank,
  getPersonalRank,
  getProfileInfo,
} = require("../controllers/apiController");

const apiRouter = express.Router();
apiRouter.get("/teamrank", getTeamRank);
apiRouter.get("/rank", getPersonalRank);
apiRouter.get("/profile/:baekjoonId", getProfileInfo);

exports.apiRouter = apiRouter;
