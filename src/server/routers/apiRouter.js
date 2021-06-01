const express = require('express');
const { getUsername } = require('../controllers/apiController');

const apiRouter = express.Router();
apiRouter.get('/getUsername', getUsername);

exports.apiRouter = apiRouter;
