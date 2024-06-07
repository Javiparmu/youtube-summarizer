'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode, useEffect, useRef, useState } from "react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeftIcon } from "lucide-react";
import { errorToast } from "@/lib/toast";
import { Toaster } from "@/components/ui/toaster";
import { getAudioFromYoutubeUrl } from "./actions/getAudioFromYoutubeUrl";
import { transcriptAudio } from "./actions/trascriptAudio";
import { getSeoOptimizedArticle } from "./actions/getSeoOptimizedArticle";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const forbiddenTags = [
  'img',
  'video',
  'iframe',
  'script',
  'style',
  'main',
  'section',
  'footer',
  'header',
  'html',
];

const sanitizeMarkdown = (text: string) => {
  return text
    .replace(/\u00A0/g, ' ')
    .replace(/\u200B/g, '')
    .replace(/^[ \t]+/gm, '');
};

export default function Home() {
  const [url, setUrl] = useState<string>("")
  const [summary, setSummary] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingText, setLoadingText] = useState<string>("")
  const [transcription, setTranscription] = useState<string>("")
  const [format, setFormat] = useState<string>("article")

  const markdownTextAreaRef = useRef<HTMLTextAreaElement>(null)
  const transcriptionAreaRef = useRef<HTMLTextAreaElement>(null)

  const onSummarize = async () => {
    try {
      setIsLoading(true)

      setLoadingText("Converting video to audio...")
      const audioPath = await getAudioFromYoutubeUrl(url)

      setLoadingText("Creating transcription...")
      const transcription = await transcriptAudio(audioPath)
      setTranscription(transcription)

      setLoadingText("Creating SEO optimized article...")
      const summary = await getSeoOptimizedArticle(transcription)

      setSummary(sanitizeMarkdown(summary as string))

      setIsLoading(false)
      setLoadingText("")
    } catch (error) {
      setIsLoading(false)
      setLoadingText("")
      errorToast("An error occurred while summarizing the video.")
    }
  }

  useEffect(() => {
    if (markdownTextAreaRef.current) {
      markdownTextAreaRef.current.style.height = "1px";
      markdownTextAreaRef.current.style.height = `${markdownTextAreaRef.current.scrollHeight}px`;
    }

    if (transcriptionAreaRef.current) {
      transcriptionAreaRef.current.style.height = "1px";
      transcriptionAreaRef.current.style.height = `${transcriptionAreaRef.current.scrollHeight}px`;
    }
  }, [format])

  if (isLoading) {
    return (
      <main className="flex flex-col gap-2 min-h-screen items-center justify-center p-24">
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
        <Toaster />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen max-w-screen flex-col items-center justify-center p-8 md:p-16 lg:20 xl:p-24">
      {!summary ? (
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
            <Button onClick={onSummarize}>Summarize video</Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="xl:w-[900px] overflow-y-auto">
          <Button onClick={() => setSummary(undefined)}>
            <ArrowLeftIcon className="w-5 h-5 mr-1" />
            Go back
          </Button>
          <div className="video-container mt-8">
            <iframe
              className="rounded-lg w-full sm:w-[450px] aspect-video"
              src={url.replace("watch?v=", "embed/")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <Select value={format} onValueChange={(value) => setFormat(value)}>
            <SelectTrigger className="w-[180px] mt-6 ml-0.5 font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Format</SelectLabel>
                <SelectItem value="article">Article</SelectItem>
                <SelectItem value="markdown">Markdown</SelectItem>
                <SelectItem value="transcription">Transcription</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {format === 'article' ? (
            <Markdown
              className="max-w-full text-wrap break-words"
              disallowedElements={forbiddenTags}
              components={{
                h1: H1Component,
                h2: H2Component,
                h3: H3Component,
                h4: H4Component,
                h5: TitleSpanComponent,
                h6: TitleSpanComponent,
              }}
              remarkPlugins={[remarkGfm]}
            >
              {summary}
            </Markdown>
          ) : format === 'markdown' ? (
            <textarea
              ref={markdownTextAreaRef}
              className="resize-none w-full mt-6 p-4 bg-gray-100 rounded-lg"
              value={summary}
              readOnly
            />
          ) : (
            <textarea
              ref={transcriptionAreaRef}
              className="resize-none w-full mt-6 p-4 bg-gray-100 rounded-lg"
              value={transcription}
              readOnly
            />
          )}
        </div>
      )}
      <Toaster />
    </main>
  );
}

const H1Component = ({ children }: { children?: ReactNode }) => (
  <h3 className="text-3xl font-bold mt-10 mb-8">{children}</h3>
);

const H2Component = ({ children }: { children?: ReactNode }) => (
  <h4 className="text-2xl font-bold mt-8 mb-5">{children}</h4>
);

const H3Component = ({ children }: { children?: ReactNode }) => (
  <h5 className="text-xl font-semibold mt-6 mb-3">{children}</h5>
);

const H4Component = ({ children }: { children?: ReactNode }) => (
  <h6 className="text-lg font-semibold mt-4 mb-2">{children}</h6>
);

const TitleSpanComponent = ({ children }: { children?: ReactNode }) => (
  <span className="font-bold">{children}</span>
);

