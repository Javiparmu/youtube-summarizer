'use server'

import { Content } from '../domain/Content'

export const getContentBySlug = async (slug: string): Promise<Content> => {
  const response = await fetch(`${process.env.API_URL}/content/${slug}`)

  const content = (await response.json()) as Content

  return content
}
