'use server'

import ytdl from '@distube/ytdl-core'
import randomIpv6 from 'random-ipv6'

const youtubeCookies = [
  {
      "domain": ".youtube.com",
      "expirationDate": 1743972898.923692,
      "hostOnly": false,
      "httpOnly": true,
      "name": "VISITOR_PRIVACY_METADATA",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "session": false,
      "storeId": null,
      "value": "CgJFUxIcEhgSFhMLFBUWFwwYGRobHB0eHw4PIBAREiEgTA%3D%3D"
  },
  {
      "domain": ".youtube.com",
      "expirationDate": 1744064238.354153,
      "hostOnly": false,
      "httpOnly": true,
      "name": "__Secure-3PSID",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "session": false,
      "storeId": null,
      "value": "g.a000owhPhEPcb2GsymJ74fLhGggYXmLGBnElYrKc7F3xX61b-m1RWs7XGk19q5f60GfCfxQckQACgYKATYSARISFQHGX2Mijf3Lt2uE7rYRY7qgOdiPqxoVAUF8yKpBuMWudRz4ItLnLi-uNZ4k0076"
  },
  {
      "domain": ".youtube.com",
      "hostOnly": false,
      "httpOnly": true,
      "name": "YSC",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "session": true,
      "storeId": null,
      "value": "VW73Ou8J1Lo"
  },
  {
      "domain": ".youtube.com",
      "expirationDate": 1744064238.35317,
      "hostOnly": false,
      "httpOnly": true,
      "name": "__Secure-1PSIDTS",
      "path": "/",
      "sameSite": null,
      "secure": true,
      "session": false,
      "storeId": null,
      "value": "sidts-CjEBQlrA-DcRgqg0Ue1nV-9V8y25YXqkNg-XGBhUs6WGVO_ifBMSl4IiM_asBjCZBV0UEAA"
  },
  {
      "domain": ".youtube.com",
      "expirationDate": 1728512850,
      "hostOnly": false,
      "httpOnly": false,
      "name": "CONSISTENCY",
      "path": "/",
      "sameSite": null,
      "secure": true,
      "session": false,
      "storeId": null,
      "value": "AKreu9sqg2m-_MiTkvJ5h91Bs-NY7YRYeU5jXguVyt7XTikDcshHCNT_37z9ElQGsm09ykwkKuIYRAoURV4psIpl1TuXUE_fw3boaivuZFHHG2OPmGlAt1BxdmNix7lvf7moWmspSCaX1MxxfqCS1Ne7"
  },
  {
      "domain": ".youtube.com",
      "expirationDate": 1744064238.353699,
      "hostOnly": false,
      "httpOnly": false,
      "name": "SAPISID",
      "path": "/",
      "sameSite": null,
      "secure": true,
      "session": false,
      "storeId": null,
      "value": "MEneivRr6PRzUL49/AeLwdctCZvgnfmKMg"
  },
  {
      "domain": ".youtube.com",
      "expirationDate": 1744064264.238554,
      "hostOnly": false,
      "httpOnly": true,
      "name": "__Secure-1PSIDCC",
      "path": "/",
      "sameSite": null,
      "secure": true,
      "session": false,
      "storeId": null,
      "value": "AKEyXzWIa_2Uru-MNfo9NrjSk0ox-18HRlvdLz0wrsbCDYM85KNLseGObumJN7ax-G5kqIbO1yo"
  },
  {
      "domain": ".youtube.com",
      "expirationDate": 1744064238.353529,
      "hostOnly": false,
      "httpOnly": true,
      "name": "SSID",
      "path": "/",
      "sameSite": null,
      "secure": true,
      "session": false,
      "storeId": null,
      "value": "AFc9mvyhfLY_FPp5L"
  },
  {
      "domain": ".youtube.com",
      "expirationDate": 1744064238.353784,
      "hostOnly": false,
      "httpOnly": false,
      "name": "__Secure-1PAPISID",
      "path": "/",
      "sameSite": null,
      "secure": true,
      "session": false,
      "storeId": null,
      "value": "MEneivRr6PRzUL49/AeLwdctCZvgnfmKMg"
  },
  {
      "domain": ".youtube.com",
      "expirationDate": 1744064238.354063,
      "hostOnly": false,
      "httpOnly": true,
      "name": "__Secure-1PSID",
      "path": "/",
      "sameSite": null,
      "secure": true,
      "session": false,
      "storeId": null,
      "value": "g.a000owhPhEPcb2GsymJ74fLhGggYXmLGBnElYrKc7F3xX61b-m1RWH1tx2NBtjHyEphkVPgZtgACgYKARoSARISFQHGX2MibdTW47PUZw_FfQYedxA6VBoVAUF8yKo2vZot-avRYsXkGD-nKFXw0076"
  },
  {
      "domain": ".youtube.com",
      "expirationDate": 1744064238.353884,
      "hostOnly": false,
      "httpOnly": false,
      "name": "__Secure-3PAPISID",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "session": false,
      "storeId": null,
      "value": "MEneivRr6PRzUL49/AeLwdctCZvgnfmKMg"
  },
  {
      "domain": ".youtube.com",
      "expirationDate": 1744064264.238631,
      "hostOnly": false,
      "httpOnly": true,
      "name": "__Secure-3PSIDCC",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "session": false,
      "storeId": null,
      "value": "AKEyXzWY1av7JqxGC_DVW0nF08EfjsFeQxfkz8o2SyLaMzX1zB9lc22ZLegWdIk_O5e8D_Y66HTJ"
  },
  {
      "domain": ".youtube.com",
      "expirationDate": 1744064238.353339,
      "hostOnly": false,
      "httpOnly": true,
      "name": "__Secure-3PSIDTS",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "session": false,
      "storeId": null,
      "value": "sidts-CjEBQlrA-DcRgqg0Ue1nV-9V8y25YXqkNg-XGBhUs6WGVO_ifBMSl4IiM_asBjCZBV0UEAA"
  },
  {
      "domain": ".youtube.com",
      "expirationDate": 1744064238.577947,
      "hostOnly": false,
      "httpOnly": true,
      "name": "LOGIN_INFO",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "session": false,
      "storeId": null,
      "value": "AFmmF2swRgIhAK-3jEBsDd9yJ4k-pyWKE6evo_2l3xo3IvHkI6pXn4MAAiEA-Cuj1W2zd5Z-gO1dJk8eWxguVmJt3x6i2_Pz-VnrxI0:QUQ3MjNmeEVRZTQxT25kaDFnUktvcUdITW1RYXZfSnFBWDhjcEhyUXBXOC16c3R4UHNzcFlpYzZ1ZmNVT3B0M1BSYkcyU0dTak1TNGNVakxCS3laakUzNjNrM2NtaFBVYVBkVGRXMnV0d2lSRU4wZlBTUW1RRjJ1SjlCNzloVmFsZzl6QndubnFKcUNxTHZBRy1iLTlsSFhrQWdWNXBLYW1R"
  },
  {
      "domain": ".youtube.com",
      "expirationDate": 1744064250.231073,
      "hostOnly": false,
      "httpOnly": true,
      "name": "NID",
      "path": "/",
      "sameSite": null,
      "secure": true,
      "session": false,
      "storeId": null,
      "value": "518=F9VbKokCeZl38G3BdxriUSAWHNDYsnwXQ2mjT5E_7cA5KKqeCSLUzKNOmvOw73R_-bSLtttz6LzsK3Vx45wTviV1XdEQgx4id9w5v0xn8KzlGjoHnEodJhDeQwib5Vh4dxMwpzCal9dpODHQLyE-QmtXJtE1mmnojEEpZYeBH0eWfBf9x-N17zVZ6LaczjXOY11eVwNG5jEGeLx2Ziaf29rpOlkAVob6A18EBezKlUoZVGGEN4ctfXm7dF6xao5oEIL-BEvYuugqNm46"
  },
  {
      "domain": ".youtube.com",
      "expirationDate": 1729117045.217355,
      "hostOnly": false,
      "httpOnly": false,
      "name": "PREF",
      "path": "/",
      "sameSite": null,
      "secure": true,
      "session": false,
      "storeId": null,
      "value": "tz=Europe.Madrid&f7=140"
  },
  {
      "domain": ".youtube.com",
      "hostOnly": false,
      "httpOnly": false,
      "name": "SOCS",
      "path": "/",
      "sameSite": null,
      "secure": true,
      "session": true,
      "storeId": null,
      "value": "CAISNQgDEitib3FfaWRlbnRpdHlmcm9udGVuZHVpc2VydmVyXzIwMjMwODI5LjA3X3AxGgJlbiADGgYIgJnPpwY"
  },
  {
      "domain": ".youtube.com",
      "expirationDate": 1743972898.923532,
      "hostOnly": false,
      "httpOnly": true,
      "name": "VISITOR_INFO1_LIVE",
      "path": "/",
      "sameSite": "no_restriction",
      "secure": true,
      "session": false,
      "storeId": null,
      "value": "ZWyZn-wI-2U"
  }
];

export const getYoutubeVideoTranscription = async (url: string) => {
  let videoInfo = null
  const videoId = ytdl.getVideoID(url)

  try {
    const agent = ytdl.createAgent(youtubeCookies as any, {
      localAddress: randomIpv6()
    })
    videoInfo = await ytdl.getBasicInfo(url, { agent })
  } catch (error: any) {
    return {
      error: error.type + '--> ' + error.message
    }
  }

  const language = videoInfo.player_response.captions?.playerCaptionsTracklistRenderer.captionTracks[0].languageCode
  if (!language) {
    return {
      error: 'It seems that the video does not have subtitles enabled. Please try with another video.'
    }
  }

  const response = await fetch(`${process.env.API_URL}/youtube-transcription/${language}/${videoId}`)

  if (!response.ok) {
    return {
      error: 'There was an error getting the transcription. Please try again.'
    }
  }

  const data = await response.json()

  return {
    title: videoInfo.videoDetails.title,
    transcription: data.transcription,
  }
}