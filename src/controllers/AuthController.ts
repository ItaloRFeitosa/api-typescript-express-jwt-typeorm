import { User } from "../entity/User";
import { Request, Response } from "express";

import { RegisterUserDto} from "../interfaces";
import JwtHelper from "../helpers/JwtHelper";

export default class AuthController {

  private jwtHelper = new JwtHelper();

  public register = async (req: Request, res: Response) => {
    let registerUserDto: RegisterUserDto = req.body;
    try {
      let newUser = User.create(registerUserDto);

      const userCreated = (await User.save(newUser)).hidePassword();

      this.jwtHelper.generateTokenAndSetCookie(
        res,
        {
          userId: userCreated.id,
          userRole: userCreated.role
        }
      );

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

      user.hidePassword();

      if(!isPasswordMatching) return res.status(401).json({message:"Access Denied"});

      this.jwtHelper.generateTokenAndSetCookie(
        res,
        {
          userId: user.id,
          userRole: user.role
        }
      );

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
