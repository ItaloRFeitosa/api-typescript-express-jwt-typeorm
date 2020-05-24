import {Router} from 'express';

import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';

import {IRoutes} from '../interfaces';

export default class GlobalRoutes implements IRoutes{
  readonly router = Router();;
  readonly path = '/';

  constructor(){
    this.addRoutes([
      new AuthRoutes(),
      new UserRoutes()
    ]);
  }

  private addRoutes(routes: Array<IRoutes>){
    routes.forEach(endpoint => {
      this.router.use(endpoint.path, endpoint.router)
    });
  };

}
