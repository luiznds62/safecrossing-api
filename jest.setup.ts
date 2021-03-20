import "dotenv/config"

module.exports = async () => {
  process.env.SECURITY_ISS = 'safecrossing-api';
  process.env.SECURITY_API_SECRET = 'f1fdeaf03bbc0f0134bfb24db9cd9989';
  process.env.SERVER_LOG_LEVEL = 'fatal';
  const db = require('./src/core/DatabaseConnection');
  await db.openConnection();
};