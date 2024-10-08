'use server'

import { Article } from "../domain/Article";

export const getArticleBySlug = async (slug: string): Promise<Article> => {
  const response = await fetch(`${process.env.API_URL}/articles/${slug}`)

  const article = await response.json() as Article

  return article
}
