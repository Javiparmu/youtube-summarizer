import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { getContentBySlug } from '@/app/actions/getContentBySlug'
import ContentShowcase from '@/components/content-showcase'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'

interface ContentPageProps {
  params: {
    slug: string
  }
}

const ContentPage = async ({ params }: ContentPageProps) => {
  const content = await getContentBySlug(params.slug)

  return (
    <div className="xl:w-[800px] overflow-y-auto">
      <Button asChild>
        <Link href="/">
          <ArrowLeftIcon className="w-5 h-5 mr-1" />
          Go back
        </Link>
      </Button>
      <div className="video-container mt-8">
        <iframe
          className="rounded-lg w-full sm:w-[450px] aspect-video"
          src={content.videoUrl.replace('watch?v=', 'embed/')}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <ContentShowcase content={content} />
      <Toaster />
    </div>
  )
}

export default ContentPage
