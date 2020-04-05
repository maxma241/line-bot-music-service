import { CustomRequest } from './../../view-model/common';
import { spotifyWebService } from './../../services/spotify';
import { Router } from 'express';
import * as moment from 'moment';

const testId = 'maxma-web-spotify';
const router = Router();

router.get('/test', (req, res) => {
  res.json({
    success: true,
    msg: 'hello spotify demo'
  })
})

// router.get('/login', (req: CustomRequest, res) => {
//   res.redirect(spotifyWebService.createSpotifyAuthorizeURL(req));
// });
router.post('/login', (req: CustomRequest, res) => {
  const url = spotifyWebService.createSpotifyAuthorizeURL(req);
  res.json({
    success: true,
    status: 200,
    result: {
      url
    }
  })
});


router.get('/callback', async (req: CustomRequest,res) => {
  const { code, state } = req.query;
  console.log('code: ', code)
  console.log('userId: ', state)
  try {
    const ret = await spotifyWebService.handleLoginCallback({ code, userId: state }, req);
    // need to set into env variable
    const spotifyCallbackWebRedirectURL = 'http://localhost:5500'
    const url = `${spotifyCallbackWebRedirectURL}/login?userId=${state}&expiredIn=${moment().add(1, 'month').toISOString()}`
    res.redirect(url);
  } catch(err) {
    console.log(err)
    res.redirect('/#/error/invalid token');
  }
});

router.get('/current-playing-track', async (req: CustomRequest, res) => {
  try {
    const userId = req.header('User-ID').toString() ?? testId;
    const ret = await spotifyWebService.getMyCurrentPlayingTrack(userId);
   
  
    res.json({
      success: true,
      result: ret,
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
