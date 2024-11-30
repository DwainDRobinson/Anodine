'use strict';

import { configDotenv } from 'dotenv';

configDotenv();

const config = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  sources: {
    database: {
      clusterDomain: process.env.CLUSTER_DOMAIN,
      dbName: process.env.DB_NAME,
      dbUser: process.env.DB_USER,
      dbPass: process.env.DB_PASS,
      options: {}
    }
  }
};

export default config;
