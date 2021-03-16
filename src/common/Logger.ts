import environments from '../common/Environments';

const bunyan = require("bunyan"),
  bformat = require("bunyan-format"),
  formatOut = bformat({ outputMode: "short" });

const logger = bunyan.createLogger({
  name: "app",
  stream: formatOut,
  level: environments.SERVER.LOG_LEVEL || "debug",
});

export { logger };
