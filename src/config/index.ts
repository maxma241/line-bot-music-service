import * as dotenv from 'dotenv';
dotenv.config();

type KKBoxConfig = {
  client_id: string
  client_secret: string
}

type SpotifyConfig = {
  clientId: string
  clientSecret: string
  redirectUri: string
}


export const kkBoxConfig: KKBoxConfig = {
  client_id: process.env.kkbox_client_id,
  client_secret: process.env.kkbox_client_secret,
}

export const spotifyConfig: SpotifyConfig = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_URL,
}