'use client'

import { InfoIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'
import { LanguageSelector } from '@/components/language-selector'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { GoogleGeminiEffect } from '@/components/ui/google-gemini-effect'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { errorToast } from '@/lib/toast'
import { createContent } from './actions/createContent'
import { getContentFromTranscription } from './actions/getContentFromTranscription'
import { getYoutubeVideoTranscription } from './actions/getYoutubeVideoTranscription'
import { extractContentSlug } from './domain/Content'
import { ContentType } from './domain/ContentType'

const sanitizeMarkdown = (text: string) => {
  return text
    .replace(/\u00A0/g, ' ')
    .replace(/\u200B/g, '')
    .replace(/^[ \t]+/gm, '')
}

export default function Home() {
  const [url, setUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingText, setLoadingText] = useState<string>('')
  const [language, setLanguage] = useState<string>('en')
  const [contentType, setContentType] = useState<ContentType>(ContentType.BLOG_POST)

  const router = useRouter()

  const onCreateArticle = async () => {
    try {
      setIsLoading(true)

      setLoadingText('Getting video transcription...')
      const { transcription, error } = await getYoutubeVideoTranscription(url, language)
      if (error) {
        setIsLoading(false)
        setLoadingText('')
        errorToast({ title: 'Error', description: error })
        return
      }

      setLoadingText('Creating content...')
      const content = await getContentFromTranscription({ transcription, type: contentType })
      console.log(content)
      if (content.error) {
        setIsLoading(false)
        setLoadingText('')
        errorToast({ title: 'Error', description: content.error })
        return
      }

      const sanitizedContent = sanitizeMarkdown(content.content!)
      const slug = extractContentSlug(sanitizedContent)
      await createContent({
        slug,
        videoUrl: url,
        content: sanitizeMarkdown(sanitizedContent),
        transcription,
        type: contentType,
      })

      router.push(`/content/${slug}`)
    } catch (error) {
      setIsLoading(false)
      setLoadingText('')
      errorToast({ title: 'Error', description: 'Please try again.' })
    }
  }

  if (isLoading) {
    return <ArticleLoading loadingText={loadingText} />
  }

  return (
    <>
      <Card className="max-w-[550px] rounded-xl border-2 border-slate-200 filter drop-shadow-xl">
        <CardHeader>
          <CardTitle>Youtube to Social</CardTitle>
          <CardDescription>Create content for socials from a Youtube video.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="youtube-url">Youtube URL</Label>
            <Input
              name="youtube-url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="language">Language</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="w-4 h-4 text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">Must be the language of the original video.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <LanguageSelector name="language" value={language} onValueChange={setLanguage} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtube-url">Content for</Label>
            <ToggleGroup
              type="single"
              onValueChange={(value) => setContentType(value as ContentType)}
              value={contentType}
              className="flex flex-wrap"
            >
              <ToggleGroupItem value={ContentType.BLOG_POST} aria-label="Toggle blog" className="flex gap-2 border">
                <Icon
                  icon="blog"
                  className="inline-flex items-center justify-center w-4 h-4"
                  iconClassName="w-full h-full"
                />
                Blog
              </ToggleGroupItem>
              <ToggleGroupItem value={ContentType.TWITTER_POST} aria-label="Toggle X" className="flex gap-2 border">
                <Icon
                  icon="xLogo"
                  className="inline-flex items-center justify-center w-4 h-4"
                  iconClassName="w-full h-full"
                />
                Twitter
              </ToggleGroupItem>
              <ToggleGroupItem
                value={ContentType.LINKEDIN_POST}
                aria-label="Toggle linkedin"
                className="flex gap-2 border"
              >
                <Icon
                  icon="linkedinLogo"
                  className="inline-flex items-center justify-center w-4 h-4"
                  iconClassName="w-full h-full"
                />
                Linkedin
              </ToggleGroupItem>
              <ToggleGroupItem
                value={ContentType.FACEBOOK_POST}
                aria-label="Toggle facebook"
                className="flex gap-2 border"
              >
                <Icon
                  icon="facebookLogo"
                  className="inline-flex items-center justify-center w-4 h-4"
                  iconClassName="w-full h-full"
                />
                Facebook
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onCreateArticle}>Create content</Button>
        </CardFooter>
      </Card>
      <GoogleGeminiEffect />
    </>
  )
}

const ArticleLoading = ({ loadingText }: { loadingText: string }) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center p-24">
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-12 h-12 text-red-100 animate-spin fill-red-400"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
      <span className="flex flex-col text-center font-medium text-gray-600">
        {loadingText}
        <span className="font-medium text-gray-600">This should take around 1 minute per 10 minutes of video.</span>
      </span>
    </div>
  )
}
