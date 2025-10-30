import { cn } from '@/lib/utils'
import React from 'react'
import { RichText } from '@/components/RichText'
import type { DefaultDocumentIDType } from 'payload'
import type { RichTextBlock as RichTextBlockProps } from '@/payload-types'

export const RichTextBlock: React.FC<
  RichTextBlockProps & {
    id?: DefaultDocumentIDType
    className?: string
  }
> = (props) => {
  const { wrapper = '4xl', alignment = 'start', richText } = props

  const wrapperClass = wrapper === '4xl' ? 'wrapper-4xl' : wrapper === '7xl' ? 'wrapper-7xl' : ''
  const alignmentClass = `justify-${alignment}`

  return (
    <div className={wrapperClass}>
      <div className={cn('flex', alignmentClass)}>
        {richText && <RichText data={richText} enableProse={true} />}
      </div>
    </div>
  )
}
