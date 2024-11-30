'use strict';

import express from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import { validateToken } from '../middlewares';
import { fancyTimeFormat } from '../utilities/time';

const { Router } = express;
const { version } = require('../../package.json');

const router = Router();

router.get('/', (_, res) => {
  res
    .status(StatusCodes.OK)
    .send({ message: 'Welcome to Anodine Service Manager Service!' });
});

router.get('/probeCheck', (_, res) => {
  res.status(StatusCodes.OK).send({
    uptime: fancyTimeFormat(process.uptime()),
    date: new Date(),
    message: 'Anodine Service Manager service up and running!',
    appVersion: version
  });
});

router.get('/ip', validateToken, (req, res) => res.send(req.ip));

router.get('/getConfiguration', validateToken, (_, res) => {
  res.status(StatusCodes.OK).send(config);
});

export default router;
