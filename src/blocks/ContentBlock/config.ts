import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'contentType',
    type: 'radio',
    defaultValue: 'richText',
    options: [
      {
        label: 'Rich Text',
        value: 'richText',
      },
      {
        label: 'Link',
        value: 'link',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    admin: {
      condition: (_, { contentType }) => contentType === 'richText',
    },
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
  },
  link({
    overrides: {
      admin: {
        condition: (_: any, siblingData: { contentType?: string }) =>
          siblingData?.contentType === 'link',
      },
    },
  }),
]

export const ContentBlock: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
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
      name: 'enableBackground',
      type: 'checkbox',
      label: 'Enable Card Background',
      defaultValue: false,
    },
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
      minRows: 1,
    },
  ],
}
