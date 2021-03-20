
module.exports = async () => {
  process.env.SECURITY_ISS = 'safecrossing-api';
  process.env.SECURITY_API_SECRET = 'f1fdeaf03bbc0f0134bfb24db9cd9989';
  process.env.SERVER_LOG_LEVEL = 'fatal';
  process.env.DATABASE_TYPE="postgres";
  process.env.DATABASE_HOST="localhost";
  process.env.DATABASE_PORT="5432";
  process.env.DATABASE_USERNAME="postgres";
  process.env.DATABASE_PASSWORD="1234";
  process.env.DATABASE_DATABASE="safecrossing-test";
  process.env.DATABASE_SYNCRONIZE="true";
};