import * as express from 'express';
import routers from './route';
import { mongoDBConnect } from './data-accessor';

const app = express();
const port = +process.env.PORT || 8080;

app.use(routers);


(async () => {

  await mongoDBConnect();

  app.listen(port, () => {
    console.log(`server is listen on http://localhost:${port}/` )
  })
})()
