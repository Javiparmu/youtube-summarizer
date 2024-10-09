'use server'

import ytdl from 'ytdl-core'

const youtubeCookie = 'YSC=VW73Ou8J1Lo; SOCS=CAISNQgDEitib3FfaWRlbnRpdHlmcm9udGVuZHVpc2VydmVyXzIwMjMwODI5LjA3X3AxGgJlbiADGgYIgJnPpwY; wide=1; VISITOR_INFO1_LIVE=ZWyZn-wI-2U; VISITOR_PRIVACY_METADATA=CgJFUxIcEhgSFhMLFBUWFwwYGRobHB0eHw4PIBAREiEgTA%3D%3D; LOGIN_INFO=AFmmF2swRgIhAOkU2D6AH92URGoFqQ1urut_KR0xMAvJOr1TdL4RGBKGAiEA5WUb9erCekxvHxx-vqp939TPGjAXJG-kx-O1Wa5ir9s:QUQ3MjNmelhzWThfUThreU5PUGNneWlnQk5oazNyTW1KUEdfbElCOEZiUTQyY05CQ1JjS01HYlZMbUp6akFYN3ZJUG0tbjZiV2w3OHdJTFlHdHZLZXlOenozZnF2eWwtQUF5RTZDaG5kM2h6bUhRSEFfbVlrZFUyWlg1V21NaUJ2RmlBbHc2M2RSV2dVMDZlS3FLeTRwMFJ2Z0FhREM1bHJwV2pkajZadExxX3BUX3ZzNi1hdHFrdFEzZHNLWE41N3dNVXg5cVRKaEVvQ2hHLXZYWDlqcTQ1dTlJbWp6Wnlydw==; PREF=tz=Europe.Madrid&f7=140; HSID=Ay14zUlRlXiGlaDU3; SSID=AvY1VfK8KK-y0wMwm; APISID=S5AwAas9125l3yCx/ALQ1xfF6mrJnnjH9g; SAPISID=XzWY7BcTPLss37a-/Asp0GUiVVb-GXGL0a; __Secure-1PAPISID=XzWY7BcTPLss37a-/Asp0GUiVVb-GXGL0a; __Secure-3PAPISID=XzWY7BcTPLss37a-/Asp0GUiVVb-GXGL0a; SID=g.a000oghPhGNb08CU-K32z7SPzMH2NpT-lSqG5yCekvt-hIwPba6Wqvh-9EG7ADeYQzEK9L0rIAACgYKAaISARISFQHGX2MiO-zfY9DcAUYiiDWMItZAGxoVAUF8yKpVaRN0MY4JQU8bmaDyJ2Lp0076; __Secure-1PSID=g.a000oghPhGNb08CU-K32z7SPzMH2NpT-lSqG5yCekvt-hIwPba6WlhAOel9JiYqsklhl0Nc2bQACgYKAdgSARISFQHGX2Mi1E-bfZZyuLGTjfD13wBg5BoVAUF8yKqOBekCOhSroNFRPHfRfDOz0076; __Secure-3PSID=g.a000oghPhGNb08CU-K32z7SPzMH2NpT-lSqG5yCekvt-hIwPba6WQvUeAwSm8uTlRUR4NySaZgACgYKAR4SARISFQHGX2MiYboLncGX-3FdFnnGF6R-IRoVAUF8yKoredkSrzGX0xNs6IWGS3r20076; __Secure-1PSIDTS=sidts-CjEBQlrA-D8Jyv0lBQI3ALHOXjEF4NEgvAe0znKdUG39aFx8kgfphoJWeuVnf9Ez1NxEEAA; __Secure-3PSIDTS=sidts-CjEBQlrA-D8Jyv0lBQI3ALHOXjEF4NEgvAe0znKdUG39aFx8kgfphoJWeuVnf9Ez1NxEEAA; ST-l3hjtt=session_logininfo=AFmmF2swRgIhAOkU2D6AH92URGoFqQ1urut_KR0xMAvJOr1TdL4RGBKGAiEA5WUb9erCekxvHxx-vqp939TPGjAXJG-kx-O1Wa5ir9s%3AQUQ3MjNmelhzWThfUThreU5PUGNneWlnQk5oazNyTW1KUEdfbElCOEZiUTQyY05CQ1JjS01HYlZMbUp6akFYN3ZJUG0tbjZiV2w3OHdJTFlHdHZLZXlOenozZnF2eWwtQUF5RTZDaG5kM2h6bUhRSEFfbVlrZFUyWlg1V21NaUJ2RmlBbHc2M2RSV2dVMDZlS3FLeTRwMFJ2Z0FhREM1bHJwV2pkajZadExxX3BUX3ZzNi1hdHFrdFEzZHNLWE41N3dNVXg5cVRKaEVvQ2hHLXZYWDlqcTQ1dTlJbWp6Wnlydw%3D%3D; ST-3opvp5=session_logininfo=AFmmF2swRgIhAOkU2D6AH92URGoFqQ1urut_KR0xMAvJOr1TdL4RGBKGAiEA5WUb9erCekxvHxx-vqp939TPGjAXJG-kx-O1Wa5ir9s%3AQUQ3MjNmelhzWThfUThreU5PUGNneWlnQk5oazNyTW1KUEdfbElCOEZiUTQyY05CQ1JjS01HYlZMbUp6akFYN3ZJUG0tbjZiV2w3OHdJTFlHdHZLZXlOenozZnF2eWwtQUF5RTZDaG5kM2h6bUhRSEFfbVlrZFUyWlg1V21NaUJ2RmlBbHc2M2RSV2dVMDZlS3FLeTRwMFJ2Z0FhREM1bHJwV2pkajZadExxX3BUX3ZzNi1hdHFrdFEzZHNLWE41N3dNVXg5cVRKaEVvQ2hHLXZYWDlqcTQ1dTlJbWp6Wnlydw%3D%3D; ST-xuwub9=session_logininfo=AFmmF2swRgIhAOkU2D6AH92URGoFqQ1urut_KR0xMAvJOr1TdL4RGBKGAiEA5WUb9erCekxvHxx-vqp939TPGjAXJG-kx-O1Wa5ir9s%3AQUQ3MjNmelhzWThfUThreU5PUGNneWlnQk5oazNyTW1KUEdfbElCOEZiUTQyY05CQ1JjS01HYlZMbUp6akFYN3ZJUG0tbjZiV2w3OHdJTFlHdHZLZXlOenozZnF2eWwtQUF5RTZDaG5kM2h6bUhRSEFfbVlrZFUyWlg1V21NaUJ2RmlBbHc2M2RSV2dVMDZlS3FLeTRwMFJ2Z0FhREM1bHJwV2pkajZadExxX3BUX3ZzNi1hdHFrdFEzZHNLWE41N3dNVXg5cVRKaEVvQ2hHLXZYWDlqcTQ1dTlJbWp6Wnlydw%3D%3D; SIDCC=AKEyXzVIySuKIq5wLL7LZEQk6Wp1mIUAPnvD7gQiWJ5WwTxjMme1Nftbpk12cafbN5zk8lyV5KJ5; __Secure-1PSIDCC=AKEyXzVEKLsESolKpxVuHa2jSNbZIcnrtFVkIzzD_UNJSdRSXwq_mXU4xqqn_uSCuXvXEwMX6Hk; __Secure-3PSIDCC=AKEyXzUO6VpcQjAL3CdbawDj79He-Rqo5nX7GLlqK_wOy7o3MvmsJ0dKcjZfjegtfIgZJg40FbSa';

export const getYoutubeVideoTranscription = async (url: string) => {
  let videoInfo = null
  const videoId = ytdl.getVideoID(url)

  try {
    videoInfo = await ytdl.getBasicInfo(url, {
      requestOptions: {
        headers: {
          cookie: youtubeCookie,
          'x-youtube-identity-token': 'QUFFLUhqbDhxWW96NDRvUVlCTEo1VUQ0V3IyZ3NOM2Q3d3w\u003d'
        }
      }
    })
  } catch (error: any) {
    return {
      error: error.message
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