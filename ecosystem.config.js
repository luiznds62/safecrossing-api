module.exports = {
  apps: [
    {
      name: "api",
      script: "dist/index.js",
      instances: 1,
      time: true,
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    },
    {
      name: "bullmq",
      script: "dist/queue.js",
      instances: 1,
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    },
  ]
};