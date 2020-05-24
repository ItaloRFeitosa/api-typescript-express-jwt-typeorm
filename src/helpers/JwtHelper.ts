import { User } from "../entity/User";
import { Response } from "express";

import config from '../config';

import jwt from 'jsonwebtoken';
import { DataStoredInToken, TokenData, RequestWithUserData } from "../interfaces";

export default class JwtHelper{

  private secret = config.jwtSecret;

  private createToken = (dataStoredInToken: DataStoredInToken): TokenData => {
    const expiresIn = 60*60;

    const token = jwt.sign(
      dataStoredInToken,
      this.secret,
      {expiresIn}
    );

    return {token, expiresIn};
  }

  private setCookie = ({token, expiresIn}: TokenData) => [`Authorization=${token}; HttpOnly; Max-Age=${expiresIn}; Path=/`];

  public generateTokenAndSetCookie = (res: Response , dataStoredInToken: DataStoredInToken) => {
    const tokenData = this.createToken(dataStoredInToken);

    res.setHeader('Set-Cookie',this.setCookie(tokenData))
  }

  public getDataFromTokenAndSetRequest = (req: RequestWithUserData, token: string) => {
    const dataStoredInToken = <DataStoredInToken>jwt.verify(token, this.secret);

    req.userData = dataStoredInToken;
  }
}
