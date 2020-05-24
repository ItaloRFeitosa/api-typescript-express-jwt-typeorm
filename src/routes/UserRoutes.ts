import {Router, Request, Response} from 'express';

import {IRoutes} from '../interfaces';

import UserController from '../controllers/UserController'

import isAuthenticated from '../middlewares/isAuthenticated';
import isAllowed from '../middlewares/isAllowed';
import UserRole from '../config/UserRole';

export default class UserRoutes implements IRoutes {
  readonly path = "/users";

  readonly router =  Router();


  constructor(){
    const controller = new UserController();

    this.router.use(isAuthenticated);
    this.router.use(isAllowed([UserRole.BASIC, UserRole.PREMIUM]));
    this.router.get("/", controller.index);

    //this.router.delete("/",isAuthenticated, userController.deleteAll)
  }
}
