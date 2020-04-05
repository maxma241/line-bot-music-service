import * as express from 'express';
import routers from './route';
import { mongoDBConnect } from './data-accessor';
import { botCtx, bottenderCtx } from './bot';

const app = express();
const port = +process.env.PORT || 8080;

(async () => {
  await bottenderCtx.prepare();

  await mongoDBConnect();

  app.use(routers);

  app.listen(port, () => {
    console.log(`server is listen on http://localhost:${port}/` )
  })
})()
