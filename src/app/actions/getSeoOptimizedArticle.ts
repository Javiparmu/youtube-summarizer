'use server'

import { summarizeTranscription } from '@/lib/text/summarizeTranscription';

export const getSeoOptimizedArticle = async (transcription: string) => {
  return summarizeTranscription(transcription);
}