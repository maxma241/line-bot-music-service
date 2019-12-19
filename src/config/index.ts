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


type MongoConfig = {
  host: string
  port: number
  database: string
  poolSize: number
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

export const mongoConfig: MongoConfig = {
  host: process.env.MONGO_DB_HOST,
  port: (+process.env.MONGO_DB_PORT),
  database: process.env.MONGO_DB_DATABASE,
  poolSize: 10,
}