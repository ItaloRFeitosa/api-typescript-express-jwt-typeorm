import {Router, Request, Response} from 'express';

import IRoutes from './IRoutes';

import UserController from '../controllers/UserController'

import isAuthenticated from '../middlewares/isAuthenticated';

export default class UserRoutes implements IRoutes {
  public path = "/users";

  public router =  Router();


  constructor(){
    const controller = new UserController();

    this.router.get("/", isAuthenticated, controller.index)

    this.router.post("/", controller.create)


    //this.router.delete("/",isAuthenticated, userController.deleteAll)
  }
}
