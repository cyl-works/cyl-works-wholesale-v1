import React from 'react'
import type { DefaultDocumentIDType } from 'payload'
import type { SpacerBlock as SpacerBlockProps } from '@/payload-types'

export const SpacerBlock: React.FC<
  SpacerBlockProps & {
    id?: DefaultDocumentIDType
  }
> = (props) => {
  const { height = 'medium' } = props

  const heightClasses = {
    small: 'h-4 md:h-8',
    medium: 'h-8 md:h-16',
    large: 'h-16 md:h-24',
  }

  return <div className={heightClasses[height!]}></div>
}
