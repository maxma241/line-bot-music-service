import { spotifyRouter } from './spotify/spotify.router';
import { Router } from 'express'
import * as cors from 'cors'
import rootMiddleware from './middleware'
import * as bodyParser from 'body-parser'
import { botRouter } from './bot/bot.router';

const router = Router();
// router.use(rootMiddleware)
router.use(cors(), bodyParser.json({
  verify: (req, _, buf) => {
    req['rawBody'] = buf.toString();
  },
}))
router.use('/api/spotify', spotifyRouter);
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    result: null,
  }).end();
})

router.use(botRouter)


export default router;