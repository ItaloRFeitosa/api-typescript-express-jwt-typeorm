import {Router, Request, Response} from 'express';

import AuthController from '../controllers/AuthController';

import IRoutes from './IRoutes';

export default class AuthRoutes implements IRoutes {
  public path = "/auth";
  public router = Router();

  constructor(){

    const controller = new AuthController();

    this.router.post("/register", controller.register)
    this.router.post("/login", controller.login)
    this.router.post("/logout", controller.logout)
  }
}
