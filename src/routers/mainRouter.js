'use strict';

import express from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import { validateAuthorizationTokenHandler } from '../middlewares';
import { capitalizeFirstLetter } from '../utilities/strings';
import { fancyTimeFormat } from '../utilities/time';

const { Router } = express;
const { version } = require('../../package.json');

const { APP_NAME } = config;

const router = Router();

router.get('/', (_, res) => {
  res.status(StatusCodes.OK).send({
    message: `Welcome to ${capitalizeFirstLetter(
      APP_NAME
    )} Service Manager Service!`
  });
});

router.get('/probeCheck', (_, res) => {
  res.status(StatusCodes.OK).send({
    uptime: fancyTimeFormat(process.uptime()),
    date: new Date(),
    message: `${capitalizeFirstLetter(
      APP_NAME
    )} Service Manager service up and running!`,
    appVersion: version
  });
});

router.get('/ip', validateAuthorizationTokenHandler, (req, res) =>
  res.send(req.ip)
);

router.get('/getConfiguration', validateAuthorizationTokenHandler, (_, res) => {
  res.status(StatusCodes.OK).send(config);
});

export default router;
