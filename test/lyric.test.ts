import { geyLyrics } from './../src/services/kkbox/lyrics';


(async () => {
  try {
    const lyric = await geyLyrics('https://www.kkbox.com/tw/tc/song/FUL00.t825ouNN1yuNN1y0XL-index.html');
    console.log(lyric);
  } catch (error) {
    console.log(error)
  }
})();