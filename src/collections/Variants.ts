import { createVariantsCollection } from '@payloadcms/plugin-ecommerce'
import { adminOnly } from '@/access/adminOnly'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'

export const Variants = createVariantsCollection({
  access: {
    adminOnly,
    adminOrPublishedStatus,
  },
  currenciesConfig: {
    defaultCurrency: 'usd',
    supportedCurrencies: [
      {
        code: 'usd',
        label: 'USD',
        symbol: '$',
        decimals: 2,
      },
    ],
  },
  inventory: true,
})
