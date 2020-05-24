import { Response, NextFunction } from "express";

import { RequestWithUserData } from "../interfaces";

export default function isAllowed(rolesAllowed: string[]){
  return (req: RequestWithUserData, res: Response, next: NextFunction) => {
    let role = req.userData.userRole;

    if(rolesAllowed.indexOf(role) > -1) next();

    else res.status(401).json({message: `${role} Role Not Allowed.`})
  }
}
