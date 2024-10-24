import '@/app/globals.css'
import { Inter as FontSans } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'Youtube Summarizer',
  description: 'Tool to create SEO optimized articles from youtube videos',
  url: 'https://youtube-summarizer.vercel.app',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <main className="flex flex-col min-h-screen items-center justify-center">
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </main>
      </body>
    </html>
  )
}
