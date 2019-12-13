import * as express from 'express';
import routers from './route';

const app = express();
const port = +process.env.PORT || 8080;

app.use(routers);

app.listen(port, () => {
  console.log(`server is listen on http://localhost:${port}/` )
})