'use client'
import { Footer } from '@/payload-types'
import { usePathname } from 'next/navigation'
import Logo from '@/../public/cyl-works-logo.svg'
import { CMSLink } from '../Link'

type Props = {
  footer: Footer
}
export function FooterClient({ footer }: Props) {
  const footerItems = footer.navItems || []
  const pathname = usePathname()

  return (
    <div className="md:bg-foreground">
      <div className="wrapper-7xl mt-8 pb-2 md:mt-24">
        <div className="bg-foreground px-2 py-16">
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:justify-between">
            <Logo className="text-primary-foreground w-48 md:w-64" />
            {footerItems.length ? (
              <ul className="flex flex-col gap-2">
                {footerItems.map((item) => (
                  <li key={item.id}>
                    <CMSLink
                      {...item.link}
                      className="text-primary-foreground text-sm md:text-base"
                      appearance="link"
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
