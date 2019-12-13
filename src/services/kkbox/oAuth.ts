import { kkBoxConfig } from './../../config/index';
import axios, { AxiosResponse } from 'axios';
import { Auth, Api } from '@kkbox/kkbox-js-sdk';
import * as moment from 'moment';

const kkboxAPI_URL = 'https://account.kkbox.com'

const endpoints = {
  oAuth: '/oauth2/token',
}

let kkboxTokenCtx = {
  accessToken: '',
  expiredDate: moment().add(-1, 'day'),
};

interface KKBoxOAuthResult {
  access_token: string
  expires_in: number
  token_type: string
  // "access_token": "fCVTwABPlcO6Qxc7Ll23rsdfsf",
  // "expires_in": 2592000,
  // "token_type": "Bearer"
}

interface SearchResult {
  tracks: {
    data: {
      id: string
      name: string
      url: string
    }[]
  }
}

const grantToken = async () => {
  const auth = new Auth(kkBoxConfig.client_id, kkBoxConfig.client_secret);
  // Fetch your access token
  const accessTokenResult: AxiosResponse<KKBoxOAuthResult> = await auth.clientCredentialsFlow.fetchAccessToken();
  kkboxTokenCtx.accessToken = accessTokenResult.data.access_token;

  kkboxTokenCtx.expiredDate = moment().add(accessTokenResult.data.expires_in, 'milliseconds');
}


export const getKKBoxApiFetcher = async () => {

  // Create an auth object with client id and secret

  if (moment().isAfter(kkboxTokenCtx.expiredDate)) {
    await grantToken();
  }

  // Create an API object with your access token
  const api = new Api(kkboxTokenCtx.accessToken);


  return {
    searchSongContext: async (singerName: string, songName: string) => {
      // Fetch content with various fetchers
      const ret: AxiosResponse<SearchResult> = await api.searchFetcher
        .setSearchCriteria(`${singerName} ${songName}`, 'track')
        .fetchSearchResult();

      return ret.data;
    }
  }

}


