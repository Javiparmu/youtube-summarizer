'use server'

export const getSeoOptimizedArticle = async (transcription: string): Promise<string> => {
  const response = await fetch(`${process.env.API_URL}/seo-article`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: transcription }),
  })

  const summary = await response.json()

  return summary.text
}