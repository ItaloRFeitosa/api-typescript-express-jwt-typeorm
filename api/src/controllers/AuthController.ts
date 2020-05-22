import { User } from "../entity/User";
import { Request, Response } from "express";

import config from '../config';

import jwt from 'jsonwebtoken';

export default class AuthController {

  private createToken(user: User){

    const expiresIn = 60*60;

    let userDataToStore = {
      userId: user.id,
      userRole: user.userRole
    };

    const token = jwt.sign(
      userDataToStore,
      config.jwtSecret,
      {expiresIn}
    );

    return {token, expiresIn};
  }

  private setCookie({token, expiresIn}){

    return [`Authorization=${token}; HttpOnly; Max-Age=${expiresIn}; Path=/`];
  }

  public register = async (req: Request, res: Response) => {

    let {name, email, password} = req.body;
    let createUserDto = {name, email, password};

    try {

      let newUser = User.create(createUserDto);

      const userCreated = (await User.save(newUser)).hidePassword();

      const tokenData = this.createToken(userCreated);

      res.setHeader('Set-Cookie',this.setCookie(tokenData))

      return res.json(userCreated);

    } catch (error) {

      return res.status(404).json(error);
    }
  }

  public login = async (req: Request, res: Response) => {

    let { email, password } = req.body;

    try {

      const user = await User.findOneOrFail({email});

      const isPasswordMatching = await user.checkPassword(password);

      if(!isPasswordMatching){

        return res.status(401).json({message:"Access Denied"});
      };

      const tokenData = this.createToken(user);

      res.setHeader('Set-Cookie',this.setCookie(tokenData))

      return res.json(user);

    } catch (error) {

      return res.status(400).json(error);
    }
  }

  async logout(req: Request, res: Response){

    res.setHeader('Set-Cookie', ['Authorization=;Max-age=0;Path=/']);

    return res.json({message: 'logout was successful'});
  }
}
