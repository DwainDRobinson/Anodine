'use strict';

import config from './config';
import logger from './logger';
import models from './models';
import generateDBUri from './queries';
import server from './server';

/**
 * Convert server port to number
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

/**
 * Connects to database
 */
const initializeDBConnection = () => {
  const { options } = config.sources.database;
  const { source } = models;
  try {
    source.connect(generateDBUri(), options);
  } catch (e) {
    logger.error(`Error connecting to db: ${e}`);
    throw e;
  }
};

/**
 * Starts web server
 */
const initializeServer = () => {
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
const bootstrapApp = async () => {
  logger.info('Starting app...');
  initializeDBConnection();
  initializeServer();
};

bootstrapApp().catch(err => {
  logger.error(`Error starting application: ${err.stack}`);
});

const gracefulExit = () => {
  /**
   * Close connection to db
   */
  logger.info('Disconnecting from database and shutting down application.');
  const { source } = models;
  source
    .disconnect()
    .then(() => {
      process.exit(0);
    })
    .catch(() => {
      process.exit(1);
    });
};

process
  .on('unhandledRejection', reason => {
    logger.error(`Unhandled rejection, reason: ${reason.stack} `);
  })
  .on('uncaughtException', err => {
    logger.error(`Uncaught exception thrown: ${JSON.stringify(err.stack)}`);
    process.exit(1);
  })
  .on('SIGINT', gracefulExit)
  .on('SIGTERM', gracefulExit);
