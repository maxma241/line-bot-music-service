import { kkboxServices } from './../kkbox/index';
import { LineSpotifyVerificationModel, LineSpotifyVerificationSchema } from './../../data-accessor/mongo/line-spotify-verification';
import { CustomRequest } from './../../view-model/common';
import { spotifyConfig } from '../../config/index';
import SpotifyWebApi = require('spotify-web-api-node');
import * as moment from 'moment';
import * as mongoose from 'mongoose';

const scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private', 'user-read-currently-playing'];

const spotifyAuthState = 'maxma-spotify';
const testId = 'maxma-web-spotify';

const spotifyWebApi = new SpotifyWebApi({
  ...spotifyConfig
});

export const spotifyWebService = {

  createSpotifyAuthorizeURL: () => {
    const spotifyLoginPage = spotifyWebApi.createAuthorizeURL(scopes, spotifyAuthState, true);
  
    return spotifyLoginPage;
  },

  handleLoginCallback: async (code: string, req: CustomRequest) => {
    const ret = await spotifyWebApi.authorizationCodeGrant(code);
    const { access_token, refresh_token, expires_in } = ret.body;    

    const id = req.payload?.lineProfile?.userId ?? testId;
    const hasExistedSpotifyVerifyData = await LineSpotifyVerificationModel.findOne({ userId: id });
    if (!hasExistedSpotifyVerifyData) {
      const lineSpotifyVerifyData = new LineSpotifyVerificationModel();
      // lineSpotifyVerifyData._id = id
      lineSpotifyVerifyData.userId = id;
      lineSpotifyVerifyData.spotifyAccessToken = access_token;
      lineSpotifyVerifyData.spotifyRefreshToken = refresh_token;
      lineSpotifyVerifyData.expiredAt = moment().add(expires_in, 'seconds').toDate();
      await LineSpotifyVerificationModel.create(lineSpotifyVerifyData);
    }

    return true;
  },

  getMyCurrentPlayingTrack: async (req: CustomRequest) => {
    const id = req.payload?.lineProfile?.userId ?? testId;
    const lineSpotifyVerifyData = await LineSpotifyVerificationModel.findOne({ userId: id });
    spotifyWebApi.setAccessToken(lineSpotifyVerifyData.spotifyAccessToken);
    spotifyWebApi.setRefreshToken(lineSpotifyVerifyData.spotifyRefreshToken);

    
    if (moment(lineSpotifyVerifyData.toJSON().expiredAt).isBefore(moment())) {
      // refresh token
      // const refreshTokenResult = await spotifyWebApi.refreshAccessToken();

      try {
        const refreshTokenResult = await spotifyWebApi.refreshAccessToken();
        const updateDic: Partial<LineSpotifyVerificationSchema> = {
          spotifyAccessToken: refreshTokenResult.body.access_token,
          expiredAt: moment().add(refreshTokenResult.body.expires_in, 'seconds').toDate(),
        }
        await LineSpotifyVerificationModel.updateOne({ userId: id, }, updateDic);
        spotifyWebApi.setAccessToken(updateDic.spotifyAccessToken);
        
      } catch (error) {
        console.log(error)
        throw new Error('access token error')
      }
    }

    try {
      const currentPlayingTrack = await spotifyWebApi.getMyCurrentPlayingTrack();
      const ret = currentPlayingTrack.body;
      const svc = await kkboxServices();
  
      const [singerName, songName] = [ret.item.artists?.[0].name ?? ret.item.album.name, ret.item.name]
      const lyrics = await svc.searchLyrics(singerName, songName);
  
      spotifyWebApi.resetAccessToken();
      spotifyWebApi.resetRefreshToken();
      return {
        singerName,
        songName,
        lyrics
      };
    } catch (error) {
      throw error;
    }
    
    
  }

  
}
