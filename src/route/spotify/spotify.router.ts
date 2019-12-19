import { CustomRequest } from './../../view-model/common';
import { spotifyWebService } from './../../services/spotify';
import { Router } from 'express';

const router = Router();


router.get('/test', (req, res) => {
  res.json({
    success: true,
    msg: 'hello spotify demo'
  })
})

router.get('/login', (req: CustomRequest, res) => {
  res.redirect(spotifyWebService.createSpotifyAuthorizeURL());
});


router.get('/callback', async (req: CustomRequest,res) => {
  const { code } = req.query;
  console.log(code)
  try {
    await spotifyWebService.handleLoginCallback(code, req);
    res.redirect('http://localhost:5500/');
  } catch(err) {
    console.log(err)
    res.redirect('/#/error/invalid token');
  }
});

router.get('/current-playing-track', async (req: CustomRequest, res) => {
  try {
    const ret = await spotifyWebService.getMyCurrentPlayingTrack(req);
   
  
    res.json({
      success: true,
      data: ret,
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      status: error.statusCode || 500,
      message: error.message,
      data: null,
    })
  }
})


export const spotifyRouter = router;
