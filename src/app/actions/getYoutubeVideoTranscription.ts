'use server'

import ytdl from '@distube/ytdl-core'
import randomIpv6 from 'random-ipv6'

const youtubeCookies = [
  { name: 'YSC', value: 'VW73Ou8J1Lo' },
  { name: 'SOCS', value: 'CAISNQgDEitib3FfaWRlbnRpdHlmcm9udGVuZHVpc2VydmVyXzIwMjMwODI5LjA3X3AxGgJlbiADGgYIgJnPpwY' },
  { name: 'wide', value: '1' },
  { name: 'VISITOR_INFO1_LIVE', value: 'ZWyZn-wI-2U' },
  { name: 'VISITOR_PRIVACY_METADATA', value: 'CgJFUxIcEhgSFhMLFBUWFwwYGRobHB0eHw4PIBAREiEgTA%3D%3D' },
  { name: 'LOGIN_INFO', value: 'AFmmF2swRgIhAOkU2D6AH92URGoFqQ1urut_KR0xMAvJOr1TdL4RGBKGAiEA5WUb9erCekxvHxx-vqp939TPGjAXJG-kx-O1Wa5ir9s:QUQ3MjNmelhzWThfUThreU5PUGNneWlnQk5oazNyTW1KUEdfbElCOEZiUTQyY05CQ1JjS01HYlZMbUp6akFYN3ZJUG0tbjZiV2w3OHdJTFlHdHZLZXlOenozZnF2eWwtQUF5RTZDaG5kM2h6bUhRSEFfbVlrZFUyWlg1V21NaUJ2RmlBbHc2M2RSV2dVMDZlS3FLeTRwMFJ2Z0FhREM1bHJwV2pkajZadExxX3BUX3ZzNi1hdHFrdFEzZHNLWE41N3dNVXg5cVRKaEVvQ2hHLXZYWDlqcTQ1dTlJbWp6Wnlydw==' },
  { name: 'PREF', value: 'tz=Europe.Madrid&f7=140' },
  { name: 'HSID', value: 'Ay14zUlRlXiGlaDU3' },
  { name: 'SSID', value: 'AvY1VfK8KK-y0wMwm' },
  { name: 'APISID', value: 'S5AwAas9125l3yCx/ALQ1xfF6mrJnnjH9g' },
  { name: 'SAPISID', value: 'XzWY7BcTPLss37a-/Asp0GUiVVb-GXGL0a' },
  { name: '__Secure-1PAPISID', value: 'XzWY7BcTPLss37a-/Asp0GUiVVb-GXGL0a' },
  { name: '__Secure-3PAPISID', value: 'XzWY7BcTPLss37a-/Asp0GUiVVb-GXGL0a' },
  { name: 'SID', value: 'g.a000oghPhGNb08CU-K32z7SPzMH2NpT-lSqG5yCekvt-hIwPba6Wqvh-9EG7ADeYQzEK9L0rIAACgYKAaISARISFQHGX2MiO-zfY9DcAUYiiDWMItZAGxoVAUF8yKpVaRN0MY4JQU8bmaDyJ2Lp0076' },
  { name: '__Secure-1PSID', value: 'g.a000oghPhGNb08CU-K32z7SPzMH2NpT-lSqG5yCekvt-hIwPba6WlhAOel9JiYqsklhl0Nc2bQACgYKAdgSARISFQHGX2Mi1E-bfZZyuLGTjfD13wBg5BoVAUF8yKqOBekCOhSroNFRPHfRfDOz0076' },
  { name: '__Secure-3PSID', value: 'g.a000oghPhGNb08CU-K32z7SPzMH2NpT-lSqG5yCekvt-hIwPba6WQvUeAwSm8uTlRUR4NySaZgACgYKAR4SARISFQHGX2MiYboLncGX-3FdFnnGF6R-IRoVAUF8yKoredkSrzGX0xNs6IWGS3r20076' },
  { name: '__Secure-1PSIDTS', value: 'sidts-CjEBQlrA-MBla61ElKUEXiJioEV3I6bj8bpGGtUa_pbIJeIH1Ar7ug6SRSkp2bKWZKNGEAA' },
  { name: '__Secure-3PSIDTS', value: 'sidts-CjEBQlrA-MBla61ElKUEXiJioEV3I6bj8bpGGtUa_pbIJeIH1Ar7ug6SRSkp2bKWZKNGEAA' },
  { name: 'SIDCC', value: 'AKEyXzX63Rl2GG5frAjV4dPsCE48uYKUtfp25MLRZY7k7d3zfCQ_DbUzXnYvjLa8sSsv6JQmaKUy' },
  { name: '__Secure-1PSIDCC', value: 'AKEyXzVFbdSnN0tf5XEtrbY_5UMT1gcIi40Wc1Tw_KLKsAtaLNgkO6J1QUfjG64pOJ5eQwiHZ1U' },
  { name: '__Secure-3PSIDCC', value: 'AKEyXzVk-y89YyZsoevtQ_f7ugoeZmt8TVD60g9F_IsC6dMM5KpXYTuGS_fIBOQSkBmcAUX_GgoX' }
];

export const getYoutubeVideoTranscription = async (url: string) => {
  let videoInfo = null
  const videoId = ytdl.getVideoID(url)

  try {
    const agent = ytdl.createAgent(youtubeCookies, {
      pipelining: 5,
      maxRedirections: 0,
      localAddress: randomIpv6()
    })
    videoInfo = await ytdl.getBasicInfo(url)
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