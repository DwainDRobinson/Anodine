'use strict';

import config from '../config';

/**
 * Helper functions for the database
 */

export const getDatabaseConnectionString = () => {
  //Generate database string url with environment variables
  const {
    DB_PASS: dbPass,
    DB_USER: dbUser,
    CLUSTER_DOMAIN,
    DB_NAME
  } = config.sources.database;
  return `mongodb+srv://${dbUser}:${dbPass}@${CLUSTER_DOMAIN}/${DB_NAME}?retryWrites=true&w=majority`;
};

export const closeDatabaseConnections = () => {
  //Close active connections to db
  const { source } = models;
  return source.disconnect();
};

export const gracefulExit = () => {
  //Gracefully shuts down application by disconnecting from all active connections to db and then process.exit(0)
  logger.info('Shutting down application.');
  closeDatabaseConnections().then(() => {
    process.exit(0);
  });
};
