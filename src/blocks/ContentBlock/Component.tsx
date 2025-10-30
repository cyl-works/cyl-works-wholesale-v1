import { cn } from '@/lib/utils'
import React from 'react'
import { RichText } from '@/components/RichText'
import type { DefaultDocumentIDType } from 'payload'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const ContentBlock: React.FC<
  ContentBlockProps & {
    id?: DefaultDocumentIDType
    className?: string
  }
> = (props) => {
  const { wrapper = '4xl', alignment = 'start', enableBackground, columns } = props

  const colsSpanClasses = {
    full: 'col-span-4',
    half: 'col-span-4 md:col-span-2',
    oneThird: 'col-span-4 md:col-span-2 lg:col-span-1',
    twoThirds: 'col-span-4 md:col-span-2 lg:col-span-3',
  }

  const wrapperClass = wrapper === '4xl' ? 'wrapper-4xl' : wrapper === '7xl' ? 'wrapper-7xl' : ''
  const alignmentClass = `justify-${alignment}`

  return (
    <div className={wrapperClass}>
      <div className={cn('flex', alignmentClass)}>
        <div
          className={cn('w-full gap-3', {
            'bg-card grid gap-8 px-2 py-8 md:gap-16 md:p-16': enableBackground,
            grid: columns && columns.length > 0,
            'grid-cols-4': columns && columns.length > 0,
          })}
        >
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { size, contentType, richText, link } = col

              return (
                <div
                  className={cn(colsSpanClasses[size!], 'flex flex-col justify-start')}
                  key={index}
                >
                  {contentType === 'richText' && richText && (
                    <RichText data={richText} enableProse={true} />
                  )}

                  {contentType === 'link' && link && (
                    <CMSLink className="px-4 py-4 md:px-6" {...link} />
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
