import { LineContext } from 'bottender';
import { router, text } from 'bottender/router'
import { spotifyWebService } from '../../services/spotify';




export default async function LineBotContextHandler(ctx: LineContext) {
  const userProfile = await ctx.getUserProfile();

  

  async function replyCurrentSongLyric(ctx: LineContext) {
    console.log('replyCurrentSongLyric: ', userProfile)
    const ret = await spotifyWebService.getMyCurrentPlayingTrack(userProfile.userId);
    ctx.replyFlex(`${ret.singerName} - ${ret.songName}`, {
      type: 'bubble',
      styles: {
        header: { backgroundColor: '#1DB954' },
        body: { backgroundColor: '#696969' },
      },
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: `${ret.singerName} - ${ret.songName}`,
            size: 'lg',
            align: 'center',
            color: '#000000'
          }
        ]
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: ret.lyrics,
            wrap: true,
            color: '#FFFFFF'
          },
        ],
      },
    })
  }

  return router([
    // return the `SayHi` action when receiving "hi" text messages
    text('目前歌詞', replyCurrentSongLyric),
  ]);
}