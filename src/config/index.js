'use strict';

import { configDotenv } from 'dotenv';
import { convertArgToBoolean } from '../utilities/boolean';

configDotenv();

const config = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  TRUST_PROXY: convertArgToBoolean(process.env.TRUST_PROXY),
  HASH_SALT: +process.env.HASH_SALT,
  JWT_SECRET: process.env.JWT_SECRET,
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
