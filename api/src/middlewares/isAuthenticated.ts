import { Request, Response, NextFunction } from "express";

import config from '../config';

import jwt from 'jsonwebtoken';

export default async function isAuthenticated(req: Request, res: Response, next: NextFunction){
  const cookies = req.cookies;

  if (cookies && cookies.Authorization) {

    const secret = config.jwtSecret;

    try {

      const {userId, userRole} = jwt.verify(cookies.Authorization, secret);

      console.log(userId, userRole)

      req.tokenData = {userId, userRole};

      next();

    } catch (error) {

      res.status(401).json({message: "Unauthorized" , error});
    }
  } else {

    res.status(401).json({message: "Unauthorized, missing cookies or auth token" });
  }
}
