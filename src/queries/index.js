'use strict';

import config from '../config';

const getDatabaseConnectionString = () => {
  const {
    DB_PASS: dbPass,
    DB_USER: dbUser,
    CLUSTER_DOMAIN,
    DB_NAME
  } = config.sources.database;
  return `mongodb+srv://${dbUser}:${dbPass}@${CLUSTER_DOMAIN}/${DB_NAME}?retryWrites=true&w=majority`;
};

export default getDatabaseConnectionString;
