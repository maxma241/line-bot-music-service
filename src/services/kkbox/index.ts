import { geyLyrics } from './lyrics';
import { getKKBoxApiFetcher } from './oAuth';



export const kkboxServices = async () => {
  const fetcher = await getKKBoxApiFetcher();

  const searchLyrics = async (singerName: string, songName: string) => {
    const songRet = await fetcher.searchSongContext(singerName, songName)

    const lyricRet = await geyLyrics(songRet.tracks.data?.[0].url);

    return lyricRet;

  }

  return {
    searchLyrics,
  }

}