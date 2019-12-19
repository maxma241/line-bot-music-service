import axios, { AxiosResponse } from 'axios';

const lineFetcher = axios.create({
  baseURL: 'https://api.line.me/v2'
})

export const LineServices = (token: string) => {

  const lineApiEndpoints = {
    profile: '/profile'
  }

  const getUserProfileByLineAPI = async (id: string) => lineFetcher.get<LineUserProfile>(lineApiEndpoints.profile, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return {
    getUserProfileByLineAPI,
  }

}

export interface LineUserProfile {
  userId: string
  displayName: string
  pictureUrl: string
  statusMessage: string
}