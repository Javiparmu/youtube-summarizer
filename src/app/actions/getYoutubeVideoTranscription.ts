'use server'

import ytdl from '@distube/ytdl-core'

export const getYoutubeVideoTranscription = async (url: string, language: string) => {
  const videoId = ytdl.getVideoID(url)

  const response = await fetch(`${process.env.API_URL}/youtube-transcription/${language}/${videoId}`)

  if (!response.ok) {
    return {
      error: 'There was an error getting the transcription. Please try again.',
    }
  }

  const data = await response.json()

  return {
    transcription: data.transcription,
  }
}
