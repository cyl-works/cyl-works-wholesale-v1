'use client'
import { CMSLink } from '@/components/Link'
import Logo from '@/../public/cyl-works-logo.svg'

import Link from 'next/link'
import React, { Suspense } from 'react'

import type { Header } from 'src/payload-types'

import { usePathname } from 'next/navigation'

import { MobileMenu } from './MobileMenu'

type Props = {
  header: Header
}

export function HeaderClient({ header }: Props) {
  const menu = header.navItems || []
  const pathname = usePathname()

  return (
    <div className="wrapper-7xl">
      <div className="py-12 md:py-24">
        <nav className="flex items-center justify-between">
          <Link href="/">
            <Logo className="text-primary w-48 md:w-64" />
          </Link>
          {menu.length ? (
            <ul className="hidden gap-16 text-xl md:flex md:items-center">
              {menu.map((item) => (
                <li key={item.id}>
                  <CMSLink {...item.link} className="text-xl" appearance="link" />
                </li>
              ))}
            </ul>
          ) : null}
          <div className="block flex-none md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>
        </nav>
      </div>
    </div>
  )
}
