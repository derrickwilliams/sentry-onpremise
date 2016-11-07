const raven = require('raven');
const dotenv = require('dotenv');
dotenv.config();

const { SENTRY_DNS } = process.env;

const sentry = new raven.Client(SENTRY_DNS);

sentry.patchGlobal(() => {
  console.log('here');
});

throw new Error('UNCAUGHT ERROR')