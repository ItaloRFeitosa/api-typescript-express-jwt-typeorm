import { User } from "../entity/User";
import { Request, Response } from "express";
import { RequestWithUserData } from "../interfaces";

export default class UserController {

  async index(req: RequestWithUserData, res: Response) {
    console.log(req.userData);
    const users = await User.find({select: ['id', 'name', 'email', 'role']});
    res.json(users);

  }

}
