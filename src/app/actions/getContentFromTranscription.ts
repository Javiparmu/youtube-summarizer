'use server'

import { ContentType } from '../domain/ContentType'

type GetSeoOptimizedContentResponse = Promise<
  | {
      error: string
      content?: undefined
    }
  | {
      content: string
      error?: undefined
    }
>

export const getContentFromTranscription = async ({
  transcription,
  type,
}: {
  transcription: string
  type: ContentType
}): GetSeoOptimizedContentResponse => {
  const response = await fetch(`${process.env.API_URL}/generate-content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ transcription, type }),
  })

  if (!response.ok) {
    return {
      error: 'There was an error creating the post. Please try again.',
    }
  }

  const data = await response.json()

  return {
    content: data.text,
  }
}
