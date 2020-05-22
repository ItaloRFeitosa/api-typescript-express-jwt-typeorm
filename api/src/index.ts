import "reflect-metadata";
import { createConnection } from "typeorm";
import GlobalRoutes from "./routes";

import App from "./App"
//import routes from "./routes";

createConnection()
  .then( async connection => {

    const app = new App(new GlobalRoutes());

    app.listen();

  })
  .catch(error => console.log(error));
