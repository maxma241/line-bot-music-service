import { LineUserProfile } from './../services/line/line-fetcher';
import { Request } from "express";

export interface CustomRequest extends Request {
  payload: {
    lineProfile: LineUserProfile
    [key: string]: any
  }
}