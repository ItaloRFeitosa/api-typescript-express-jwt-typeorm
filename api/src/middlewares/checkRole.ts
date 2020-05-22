import { Request, Response, NextFunction } from "express";
import UserRole from "../config/UserRole";

export default function checkRole(userRole: UserRole){
  return (req: Request, res: Response, next: NextFunction) => {

  }
}
