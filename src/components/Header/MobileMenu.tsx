'use client'

import type { Header } from '@/payload-types'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { X } from 'lucide-react'
import { Bars3Icon } from '@heroicons/react/24/outline'

interface Props {
  menu: Header['navItems']
}

export function MobileMenu({ menu }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, searchParams])

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger className="flex cursor-pointer items-center justify-center">
        <Bars3Icon className="size-14 stroke-1" />
      </DialogTrigger>
      <DialogContent
        className="bg-foreground max-w-xs border-none p-4 sm:max-w-xs"
        showCloseButton={false}
      >
        <VisuallyHidden asChild>
          <DialogHeader>
            <DialogTitle>Menu</DialogTitle>
            <DialogDescription />
          </DialogHeader>
        </VisuallyHidden>
        <div className="flex aspect-2/3 flex-col justify-between">
          <div>
            {menu?.length ? (
              <ul className="flex w-full flex-col gap-4">
                {menu.map((item) => (
                  <li key={item.id}>
                    <CMSLink
                      {...item.link}
                      label={item.link.label.toUpperCase()}
                      className="border-background w-full justify-end border p-4 text-base"
                      appearance="default"
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <div className="group flex cursor-pointer items-center gap-5">
                <Button
                  className="text-primary-foreground decoration-primary-foreground/0 cursor-pointer p-0 text-base"
                  variant="link"
                >
                  CLOSE
                </Button>
                <Button
                  className="bg-foreground border-background text-primary-foreground group-hover:text-foreground group-hover:bg-primary-foreground cursor-pointer"
                  variant="outline"
                  size="icon-lg"
                >
                  <X size={24} strokeWidth={1} className="size-6" />
                </Button>
              </div>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
