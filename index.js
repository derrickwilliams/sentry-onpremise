import express from 'express';
import { each } from 'lodash';
import raven, { Client as RavenClient } from 'raven';
import setupDotenv from './app/setup_dotenv';
import setupAppMetrics from './app/setup_appmetrics';
import appmetrics from 'appmetrics';

setupDotenv();

const app = express();
const dash = setupAppMetrics({ app });
const { SENTRY_DNS, SENTRY_DNS_PUBLIC, APP_PORT } = process.env;



app.set('view engine', 'ejs');

app.use(raven.middleware.express.requestHandler(SENTRY_DNS));

app.get('/', (req, res) => {
  res.locals = {
    env: { SENTRY_DNS: SENTRY_DNS_PUBLIC }
  };

  res.render('index');
});

app.get('/bad', (req, res) => {
  throw new Error('Bad puppy!!');
})

app.use(raven.middleware.express.errorHandler(SENTRY_DNS));

app.listen(APP_PORT);
console.log('listening', APP_PORT);