import { ArrowLeftIcon } from "lucide-react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ArticleShowcase from '@/components/article-showcase';
import { getArticleBySlug } from "@/app/actions/getArticleBySlug";

interface ArticlePageProps {
	params: {
		slug: string
	}
}

const ArticlePage = async ({ params }: ArticlePageProps) => {
	const article = await getArticleBySlug(params.slug)

  return (
    <div className="xl:w-[900px] overflow-y-auto">
			<Button asChild>
				<Link href="/">
					<ArrowLeftIcon className="w-5 h-5 mr-1" />
					Go back
				</Link>
			</Button>
			<div className="video-container mt-8">
				<iframe
					className="rounded-lg w-full sm:w-[450px] aspect-video"
					src={article.videoUrl.replace("watch?v=", "embed/")}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>
			<ArticleShowcase article={article} />
		</div>
  )
}

export default ArticlePage