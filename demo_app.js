const raven = require('raven');
const dotenv = require('dotenv');
const casual = require('casual');

dotenv.config();

const { SENTRY_DNS } = process.env;

const sentry = new raven.Client(SENTRY_DNS);

sentry.patchGlobal(() => {
  console.log('here');
});
