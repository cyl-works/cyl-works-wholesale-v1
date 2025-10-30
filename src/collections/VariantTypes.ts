import { adminOnly } from '@/access/adminOnly'
import { publicAccess } from '@/access/publicAccess'
import { createVariantTypesCollection } from '@payloadcms/plugin-ecommerce'

export const VariantTypes = createVariantTypesCollection({
  access: {
    adminOnly,
    publicAccess,
  },
})
