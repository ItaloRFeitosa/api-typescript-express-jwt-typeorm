
import express, {Request, Response, Application, Router} from "express";

import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import {IRoutes} from './interfaces';

export default class App {
  private app: Application;
  private port: number;

  constructor(routes: IRoutes, port?: number){
    this.app = express();
    this.port = port || 3333;

    this.initializeMiddlewares();

    this.initializeRoutes(routes);

  }

  private initializeMiddlewares(){

    this.app.use(cors())
      .use(helmet())
      .use(cookieParser())
      .use(express.json());

  }

  private initializeRoutes(routes: IRoutes){

    this.app.use(routes.path, routes.router);

  }

  public listen() {
    this.app.listen(this.port, () => {
    console.log(`App listening on the port ${this.port}`);
    });
  }
}
