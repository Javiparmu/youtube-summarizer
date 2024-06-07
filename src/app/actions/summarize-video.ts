'use server'

import { transcriptAudio } from '@/lib/audio/transcriptAudio';
import { youtubeVideoToAudio } from '@/lib/audio/youtubeVideoToAudio';
import { summarizeTranscription } from '@/lib/text/summarizeTranscription';
import fs from 'fs';

export const summarizeVideo = async (url: string) => {
  const audioPath = await youtubeVideoToAudio(url);
  const transcription = await transcriptAudio(audioPath);
  const summary = await summarizeTranscription(transcription);

  fs.unlinkSync(audioPath);

  return summary;
}