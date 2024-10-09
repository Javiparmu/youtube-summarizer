'use client'

import React, { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeCallouts from 'rehype-callouts';
import rehypeMathjax from 'rehype-mathjax';
import 'rehype-callouts/theme/github'
import { Article } from '@/app/domain/Article';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';

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

interface ArticleShowcaseProps {
	article: Article
}

const ArticleShowcase = ({ article }: ArticleShowcaseProps) => {
	const [format, setFormat] = useState<string>("article")

	const transcriptionAreaRef = useRef<HTMLTextAreaElement>(null)
	const markdownTextAreaRef = useRef<HTMLTextAreaElement>(null)

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

  return (
    <div>
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
					className="w-full max-w-full text-wrap break-words prose mt-10"
					disallowedElements={forbiddenTags}
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeMathjax, [rehypeCallouts, { theme: 'github' }]]}
				>
					{article.content}
				</Markdown>
			) : format === 'markdown' ? (
				<textarea
					ref={markdownTextAreaRef}
					className="resize-none w-full mt-6 p-4 bg-gray-100 rounded-lg"
					value={article.content}
					readOnly
				/>
			) : (
				<textarea
					ref={transcriptionAreaRef}
					className="resize-none w-full mt-6 p-4 bg-gray-100 rounded-lg"
					value={article.transcription}
					readOnly
				/>
			)}
    </div>
  )
}

export default ArticleShowcase