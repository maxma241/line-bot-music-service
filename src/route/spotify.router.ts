import { kkboxServices } from './../services/kkbox/index';
import { spotifyConfig } from './../config/index';
import SpotifyWebApi = require('spotify-web-api-node');
import { Router } from 'express';

const router = Router();
const scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private', 'user-read-currently-playing']

export const spotifyWebApi = new SpotifyWebApi({
  ...spotifyConfig
});


router.get('/test', (req, res) => {
  res.json({
    success: true,
    msg: 'hello spotify demo'
  })
})

router.get('/login', (req, res) => {
  const html = spotifyWebApi.createAuthorizeURL(scopes, 'sc', false)
  console.log(html)
  res.redirect(html);
});


router.get('/callback', async (req,res) => {
  const { code } = req.query;
  console.log(code)
  try {
    const data = await spotifyWebApi.authorizationCodeGrant(code)
    const { access_token, refresh_token } = data.body;
    console.log('data.body: ', data.body)
    spotifyWebApi.setAccessToken(access_token);
    spotifyWebApi.setRefreshToken(refresh_token);

    res.redirect('http://localhost:5500/');
  } catch(err) {
    res.redirect('/#/error/invalid token');
  }
});

router.get('/current-playing-track', async (req, res) => {
  try {
    const currentPlayingTrack = await spotifyWebApi.getMyCurrentPlayingTrack();
    const ret = currentPlayingTrack.body;

    const lyrics = await (await kkboxServices()).searchLyrics(ret.item.artists?.[0].name ?? ret.item.album.name, ret.item.name)
  
    res.json({
      success: true,
      data: {
        item: currentPlayingTrack.body.item,
        lyrics,
      }
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      msg: error.msg,
      data: null,
    })
  }
})


export const spotifyRouter = router;
