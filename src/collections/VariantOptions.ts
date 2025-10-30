import { adminOnly } from '@/access/adminOnly'
import { publicAccess } from '@/access/publicAccess'
import { createVariantOptionsCollection } from '@payloadcms/plugin-ecommerce'

export const VariantOptions = createVariantOptionsCollection({
  access: {
    adminOnly,
    publicAccess,
  },
})
