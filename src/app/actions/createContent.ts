'use server'

import { Content } from '../domain/Content'

export const createContent = async (content: Content) => {
  const response = await fetch(`${process.env.API_URL}/content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })

  if (!response.ok) {
    return {
      error: 'There was an error creating the content. Please try again.',
    }
  }
}
