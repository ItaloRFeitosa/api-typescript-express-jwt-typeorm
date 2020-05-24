import { Response, NextFunction } from "express";

import {RequestWithUserData } from "../interfaces";

import JwtHelper from "../helpers/JwtHelper";

export default async function isAuthenticated(req: RequestWithUserData, res: Response, next: NextFunction){
  const cookies = req.cookies;

  if (cookies && cookies.Authorization) {
    try {
      new JwtHelper().getDataFromTokenAndSetRequest(req, cookies.Authorization);

      next();

    } catch (error) {

      res.status(401).json({message: "Unauthorized" , error});
    }
  } else {

    res.status(401).json({message: "Unauthorized, missing cookies or auth token" });
  }
}
