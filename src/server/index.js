import express from 'express';
import apiRouter from './routers/apiRouter';
import * as crawler from './controllers/crawler';

const app = express();

app.use(express.static('dist'));
app.use('/api', apiRouter);

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`),
);

crawler.startCrawling();
