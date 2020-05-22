import {Router} from 'express';

import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';

import IRoutes from './IRoutes';

export default class GlobalRoutes implements IRoutes{
  public router = Router();;
  public path = '/';

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
