'use strict';

import config from './config';
import logger from './logger';
import models from './models';
import getDatabaseConnectionString from './queries';
import server from './server';

/**
 * Convert server port string to number
 */
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const closeDatabaseConnections = () => {
  /**
   * Close connection to db
   */
  const { source } = models;
  return source.disconnect();
};

const gracefulExit = () => {
  logger.info('Shutting down application.');
  closeDatabaseConnections().then(() => {
    process.exit(0);
  });
};

/**
 * Connects to database
 */
const initializeDBConnection = () => {
  const { source } = models;
  const { options } = config.sources.database;
  try {
    source.connect(getDatabaseConnectionString(), options);
  } catch (e) {
    logger.error(`Error connecting to db: ${e}`);
    throw e;
  }
};

/**
 * Starts web server
 */
const startServer = () => {
  const { PORT, HOST } = config;
  try {
    server.listen(normalizePort(PORT), HOST);
    logger.info(`Server listening on port: ${PORT}`);
  } catch (err) {
    logger.error(`Server started with error: ${err}`);
    throw err;
  }
};

/**
 * Start web application
 */
const runApplication = async () => {
  const { APP_NAME } = config;
  logger.info(`Starting ${APP_NAME} app...`);
  initializeDBConnection();
  startServer();
};

runApplication().catch(err => {
  logger.error(`Error starting application: ${err.message}`);
});

process
  .on('unhandledRejection', reason => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
    logger.error(`Unhandled rejection, reason: ${reason.stack} `);
  })
  .on('uncaughtException', err => {
    console.error(
      new Date().toUTCString() + ' uncaughtException:',
      err.message
    );
    logger.error(`Uncaught exception thrown: ${err.message}`);
    logger.info(
      'Disconnecting from database and shutting down application from uncaughtException.'
    );
    closeDatabaseConnections().then(() => {
      process.exit(1);
    });
  })
  .on('SIGINT', gracefulExit)
  .on('SIGTERM', gracefulExit);
