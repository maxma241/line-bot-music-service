import * as cheerio from 'cheerio'
import axios from 'axios'


export const geyLyrics = async (lyricURL: string) => {
  const lyricsHTML = await axios.get(lyricURL)
  
  const $ = cheerio.load(lyricsHTML.data)
  const lyrics = $('body > div.container > div.row > div.col-8 > div.song-content > p').text()

  return lyrics;
}