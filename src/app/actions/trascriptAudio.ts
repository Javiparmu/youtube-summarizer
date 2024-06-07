'use server'

import { transcriptAudioWithOpenAI } from '@/lib/audio/transcriptAudio';
import fs from 'fs';

export const transcriptAudio = async (audioPath: string) => {
  const transcription = await transcriptAudioWithOpenAI(audioPath);

  fs.unlinkSync(audioPath);

  return transcription;
}