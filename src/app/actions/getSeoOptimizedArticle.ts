'use server'

type GetSeoOptimizedArticleResponse = Promise<{
  error: string;
  article?: undefined;
} | {
  article: string;
  error?: undefined;
}>

export const getSeoOptimizedArticle = async ({ transcription }: { transcription: string }): GetSeoOptimizedArticleResponse => {
  const response = await fetch(`${process.env.API_URL}/seo-article`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ transcription }),
  })

  if (!response.ok) {
    return {
      error: 'There was an error creating the SEO article. Please try again.',
    }
  }

  const data = await response.json()

  return {
    article: data.text
  }
}