import * as mongoose from 'mongoose'


export interface LineSpotifyVerificationSchema {
  userId: string
  spotifyAccessToken: string
  spotifyRefreshToken: string
  expiredAt: Date
  createAt: Date
  updateAt: Date
}

interface LineSpotifyVerificationDocument extends mongoose.Document, LineSpotifyVerificationSchema {}

const lineProfileSchema = new mongoose.Schema<LineSpotifyVerificationSchema>({
  userId: { type: String, index: true },
  spotifyAccessToken: String,
  spotifyRefreshToken: String,
  expiredAt:{ type: Date, default: Date.now },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
})

export const LineSpotifyVerificationModel = mongoose.model<LineSpotifyVerificationDocument>('lineSpotifyVerification', lineProfileSchema);



