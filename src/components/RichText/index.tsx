import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'

import { cn } from '@/lib/utils'

type NodeTypes = DefaultNodeTypes

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
})

type Props = {
  data: SerializedEditorState
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const RichText: React.FC<Props> = (props) => {
  const { className, enableProse = true, ...rest } = props
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        {
          'prose prose-sm md:prose-base md:prose-headings:text-xl prose-headings:text-base prose-headings:font-bold prose-headings:mb-3! prose-headings:mt-3! prose-p:mb-3! prose-p:mt-3! text-primary max-w-none':
            enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
