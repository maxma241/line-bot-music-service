import mongoose from 'mongoose'


export interface LineProfileSchema {
  userId: string
  displayName: string
  pictureUrl: string
  statusMessage: string
  token: string
  createAt: Date
  updateAt: Date
}

interface LineProfileDocument extends mongoose.Document, LineProfileSchema {}

const lineProfileSchema = new mongoose.Schema<LineProfileSchema>({
  userId: { type: [String], index: true },
  displayName: String,
  pictureUrl: String,
  statusMessage: String,
  token: String,
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
})

export const LineUserProfileModel = mongoose.model<LineProfileDocument>('lineProfile', lineProfileSchema);



