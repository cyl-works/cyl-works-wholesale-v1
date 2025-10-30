'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'

export const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="wrapper-7xl mt-8 md:mt-24">
      <div className="flex justify-end">
        <div className="group flex cursor-pointer items-center gap-5" onClick={scrollToTop}>
          <Button
            className="text-primary decoration-primary-foreground/0 cursor-pointer p-0 text-base"
            variant="link"
          >
            SCROLL TO TOP
          </Button>
          <Button
            className="group-hover:bg-foreground hover:bg-foreground hover:text-primary-foreground border-border group-hover:text-primary-foreground bg-primary-foreground text-foreground cursor-pointer"
            variant="outline"
            size="icon-lg"
          >
            <ArrowUp size={24} strokeWidth={1} className="size-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
