'use server'

import { Article } from "../domain/Article"

export const createArticle = async (article: Article) => {
  const response = await fetch(`${process.env.API_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(article)
  })

  if (!response.ok) {
    return {
      error: 'There was an error creating the article. Please try again.'
    }
  }
}