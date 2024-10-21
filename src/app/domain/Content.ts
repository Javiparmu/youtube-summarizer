import slugify from 'slugify'
import { ContentType } from './ContentType'

export interface Content {
  slug: string
  videoUrl: string
  content: string
  transcription: string
  type: ContentType
}

export const extractContentSlug = (content: string): string => {
  const title = content.match(/^# (.+)$/m)?.[1] || 'untitled'
  const slug = slugify(title, {
    lower: true,
    strict: true,
    locale: 'en',
  })

  const hash = Math.random().toString(36).substring(7)

  return `${slug}-${hash}`
}
