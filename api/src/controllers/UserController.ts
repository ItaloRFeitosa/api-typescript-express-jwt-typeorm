import { User } from "../entity/User";
import { Request, Response } from "express";

export default class UserController {

  async index(req: Request, res: Response) {

    const users = await User.find({select: ['id', 'name', 'email', 'userRole']});
    res.json(users);

  }

  async create(req: Request, res: Response) {
    let {name, email, password} = req.body;
    let createUserDto = {name, email, password};

    try {

      const newUser = User.create(createUserDto);
      const userCreated = await User.save(newUser);

      return res.json(userCreated);

    } catch (error) {
      console.log(error);

      return res.status(404).json(error);
    }

  }

}
