/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import config from './app/config';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors({ origin: config.client_url, credentials: true }));
app.use(cookieParser());

// application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  Promise.reject();
  // const a = 10;
  // res.send(a);
};

app.get('/', test);

// use global error handler middleware
app.use(globalErrorHandler);

// Not found middleware,
app.use(notFound);

export default app;
