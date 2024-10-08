export interface Article {
  slug: string;
  videoUrl: string;
  content: string;
  transcription: string;
}

export const extractArticleSlug = (articleContent: string): string => {
  const title = articleContent.match(/^# (.+)$/m)?.[1] || "untitled";
  const slug = title.toLowerCase().replace(/ /g, "-");

  const hash = Math.random().toString(36).substring(7);

  return `${slug}-${hash}`;
}