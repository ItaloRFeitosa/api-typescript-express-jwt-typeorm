import {Request, Router} from 'express';

export interface TokenData{
  token: string;
  expiresIn: number;
}

export interface DataStoredInToken{
  userId: string;
  userRole: string;
}

export interface RegisterUserDto{
  name: string;
  email: string;
  password: string;
}

export interface RequestWithUserData extends Request{
  userData: DataStoredInToken;
}

export interface IRoutes{
  path: string;
  router: Router;
}
