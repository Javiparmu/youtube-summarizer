'use server'

import { youtubeVideoToAudio } from '@/lib/audio/youtubeVideoToAudio';

export const getAudioFromYoutubeUrl = async (url: string) => {
  return youtubeVideoToAudio(url);
}