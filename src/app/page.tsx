'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { errorToast } from "@/lib/toast";
import { getSeoOptimizedArticle } from "./actions/getSeoOptimizedArticle";
import { getYoutubeVideoTranscription } from "./actions/getYoutubeVideoTranscription";
import { createArticle } from "./actions/createArticle";
import { extractArticleSlug } from "./domain/Article";
import { useRouter } from "next/navigation";

const sanitizeMarkdown = (text: string) => {
  return text
    .replace(/\u00A0/g, ' ')
    .replace(/\u200B/g, '')
    .replace(/^[ \t]+/gm, '');
};

export default function Home() {
  const [url, setUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingText, setLoadingText] = useState<string>("")

  const router = useRouter()

  const onCreateArticle = async () => {
    try {
      setIsLoading(true)

      setLoadingText("Getting video transcription...")
      console.log(url)
      const transcription = await getYoutubeVideoTranscription(url)
      console.log(transcription)
      if (!transcription) {
        setIsLoading(false)
        setLoadingText("")
        errorToast("An error occurred while transcribing the video.")
        return
      }

      setLoadingText("Creating SEO optimized article...")
      const article = await getSeoOptimizedArticle(transcription)
      if (!article) {
        setIsLoading(false)
        setLoadingText("")
        errorToast("An error occurred while summarizing the video.")
        return
      }

      const sanitizedArticle = sanitizeMarkdown(article)
      const slug = extractArticleSlug(sanitizedArticle)
      await createArticle({
        slug,
        videoUrl: url,
        content: sanitizeMarkdown(sanitizedArticle),
        transcription
      })

      setIsLoading(false)
      setLoadingText("")

      router.push(`/articles/${slug}`)
    } catch (error) {
      setIsLoading(false)
      setLoadingText("")
      errorToast("An error occurred while creating the article.")
    }
  }

  if (isLoading) {
    return <ArticleLoading loadingText={loadingText} />
  }

  return (
    <div className="flex max-w-screen flex-col items-center justify-center p-8 md:p-16 lg:20 xl:p-24">
      <Card>
        <CardHeader>
          <CardTitle>Youtube Summarizer</CardTitle>
          <CardDescription>Create a SEO optimize article from a Youtube video.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="youtube-url">Youtube URL</Label>
            <Input name="youtube-url" placeholder="https://www.youtube.com/watch?v=..." value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onCreateArticle}>Summarize video</Button>
        </CardFooter>
      </Card>
    </div>
  );
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
        <span className="font-medium text-gray-600">
          This should take around 1 minute per 10 minutes of video.
        </span>
      </span>
    </div>
  )
}
