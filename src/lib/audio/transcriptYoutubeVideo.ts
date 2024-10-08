import { YoutubeTranscript } from 'youtube-transcript';

export const transcriptYoutubeVideo = async (url: string) => {
  const videoTranscription = await YoutubeTranscript.fetchTranscript(url);

  const formattedTranscription = videoTranscription.map((transcript) => {
    return transcript.text;
  }).join(' ');

  return formattedTranscription;
}