import { Button } from '@/components/ui/button'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="wrapper-7xl">
      <div className="bg-primary px-6 py-16 md:px-16 md:py-32">
        <div className="text-primary-foreground flex flex-col items-center justify-center gap-12 text-center md:gap-16">
          <div className="flex flex-col items-center gap-6 md:gap-8">
            <ExclamationTriangleIcon className="size-16 stroke-[0.5px] md:size-24" />
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl font-bold md:text-6xl">404</h1>
              <p className="text-sm md:text-2xl">Page not found</p>
            </div>
          </div>
          <p className="max-w-md text-sm md:max-w-xl md:text-base">
            The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable.
          </p>
          <Button asChild variant="outline" size="lg" className="text-primary">
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
