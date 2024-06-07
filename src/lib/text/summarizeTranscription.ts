import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: process.env.OPENAI_PROJECT_ID,
})

const systemMessage: ChatCompletionMessageParam = {
  role: "system",
  content: 
    `You are going to receive the transcription of a youtube video. I need you to make a SEO optimized article from it. 
    It will be used to create a guide of a game. If you detect that it is talking about an specific game, you can correct 
    names and words related to the game to make it more SEO friendly.
    Keep the transcription language and write it in markdown format.
    Try to make it as informative as possible and avoid missing information from the transcription.`
};

export const summarizeTranscription = async (transcription: string) => {
  const summary = await openai.chat.completions.create({
    model: "gpt-4o-2024-05-13",
    messages: [
      systemMessage,
      { role: "user", content: transcription },
    ],
  });

  return summary.choices[0].message.content;
}