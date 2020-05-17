import "reflect-metadata";
import { createConnection } from "typeorm";
import express, {Request, Response} from "express";
import helmet from "helmet";
import cors from "cors";
//import routes from "./routes";

createConnection()
  .then( async connection => {
    const app = express();

      app.use(cors())
        .use(helmet())
        .use(express.json())
        .use("/", (req: Request, res: Response) => {
          return res.json({message: "Its Working"});
        })
        .listen(3000, () => {
          console.log("Server started on port 3000");

        });

  })
  .catch(error => console.log(error));
