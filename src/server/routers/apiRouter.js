import express from 'express';
import {
  getTeamRank,
  getPersonalRank,
  getProfileInfo,
} from '../controllers/apiController';

const apiRouter = express.Router();
apiRouter.get('/teamrank', getTeamRank);
apiRouter.get('/rank', getPersonalRank);
apiRouter.get('/profile/:baekjoonId', getProfileInfo);

export default apiRouter;
