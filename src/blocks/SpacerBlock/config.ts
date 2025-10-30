import type { Block } from 'payload'

export const SpacerBlock: Block = {
  slug: 'spacer',
  interfaceName: 'SpacerBlock',
  fields: [
    {
      name: 'height',
      type: 'select',
      defaultValue: 'medium',
      options: [
        {
          label: 'Small (h-4 md:h-8)',
          value: 'small',
        },
        {
          label: 'Medium (h-8 md:h-16)',
          value: 'medium',
        },
        {
          label: 'Large (h-16 md:h-24)',
          value: 'large',
        },
      ],
    },
  ],
}
