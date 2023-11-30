/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/stutdent.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);


const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
}

app.get('/', getAController);

// use global error handler middleware
app.use(globalErrorHandler);

// Not found middleware,
app.use(notFound);


export default app;
