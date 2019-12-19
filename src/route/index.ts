import { spotifyRouter } from './spotify/spotify.router';
import { Router } from 'express'
import rootMiddleware from './middleware'

const router = Router();
// router.use(rootMiddleware)
router.use('/api/spotify', spotifyRouter);


export default router;