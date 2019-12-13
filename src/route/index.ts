import { spotifyRouter } from './spotify.router';
import { Router } from 'express'

const router = Router();
router.use('/api/spotify', spotifyRouter);


export default router;