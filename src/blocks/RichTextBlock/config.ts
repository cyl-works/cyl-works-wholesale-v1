import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  fields: [
    {
      name: 'wrapper',
      type: 'select',
      defaultValue: '4xl',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: '4xl',
          value: '4xl',
        },
        {
          label: '7xl',
          value: '7xl',
        },
      ],
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'start',
      options: [
        {
          label: 'Start',
          value: 'start',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'End',
          value: 'end',
        },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      required: true,
    },
  ],
}
