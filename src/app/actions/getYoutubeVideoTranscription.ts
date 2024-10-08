'use server'

import { transcriptYoutubeVideo } from "@/lib/audio/transcriptYoutubeVideo"

export const getYoutubeVideoTranscription = async (url: string) => {
  return transcriptYoutubeVideo(url)
}