import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

export const buildInitialFormState = (fields: FormType['fields']) => {
  const initialValues = {}

  if (!fields) return initialValues

  fields.forEach((field) => {
    if ('name' in field) {
      if (field.blockType === 'checkbox') {
        initialValues[field.name] = field.defaultValue || false
      } else {
        initialValues[field.name] = field.defaultValue || ''
      }
    }
  })

  return initialValues
}
