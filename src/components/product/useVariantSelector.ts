import { useState, useEffect, useMemo } from 'react'
import { Product, Variant, VariantType, VariantOption } from '@/payload-types'

// Helper: Extract variant types that are ACTUALLY used in variants (in order)
function extractUsedVariantTypes(product: Product, variants: Variant[]): VariantType[] {
  if (!product.variantTypes) return []

  const allVariantTypes = product.variantTypes.filter((vt): vt is VariantType => typeof vt === 'object')

  // Only return variant types that are actually used in at least one variant
  return allVariantTypes.filter((variantType) => {
    return variants.some((variant) => {
      if (typeof variant !== 'object') return false

      return variant.options.some((opt) => {
        if (typeof opt !== 'object') return false
        const optVarType = typeof opt.variantType === 'object' ? opt.variantType.id : opt.variantType
        return optVarType === variantType.id
      })
    })
  })
}

// Helper: Get ONLY the options that actually exist in variants for a variant type
function getOptionsForVariantType(variantType: VariantType, variants: Variant[]): VariantOption[] {
  const usedOptions = new Set<string>()

  // Collect all option IDs that are actually used in variants for this variant type
  variants.forEach((variant) => {
    if (typeof variant !== 'object') return

    variant.options.forEach((opt) => {
      if (typeof opt !== 'object') return

      const optVarType = typeof opt.variantType === 'object' ? opt.variantType.id : opt.variantType
      if (optVarType === variantType.id) {
        usedOptions.add(opt.id)
      }
    })
  })

  // Return only the options that are used
  if (!variantType.options?.docs) return []

  return variantType.options.docs.filter((opt): opt is VariantOption => {
    return typeof opt === 'object' && usedOptions.has(opt.id)
  })
}

// Helper: Check if an option is available based on current selections (top-to-bottom cascading)
function isOptionAvailable(
  variants: Variant[],
  variantTypeId: string,
  optionId: string,
  currentSelections: Record<string, string>,
  variantTypes: VariantType[],
  currentTypeIndex: number,
): boolean {
  // Get previous variant types (for layer-by-layer cascading logic)
  const previousTypes = variantTypes.slice(0, currentTypeIndex)

  // Find variants that match all previous selections
  const matchingVariants = variants.filter((variant) => {
    if (typeof variant !== 'object') return false

    // Check that this variant matches all previous selections
    return previousTypes.every((prevType) => {
      const selectedOptionId = currentSelections[prevType.id]
      if (!selectedOptionId) return true

      // Check if this variant has the selected option
      return variant.options.some((opt) => {
        if (typeof opt !== 'object') return false
        return opt.id === selectedOptionId
      })
    })
  })

  // Check if any of these matching variants have the option we're checking
  return matchingVariants.some((variant) => {
    return variant.options.some((opt) => {
      if (typeof opt !== 'object') return false
      return opt.id === optionId
    })
  })
}

// Helper: Find matching variant based on selections
function findMatchingVariant(
  variants: Variant[],
  selections: Record<string, string>,
  variantTypes: VariantType[],
): Variant | null {
  // Only search if all variant types have selections
  const allSelected = variantTypes.every((vt) => selections[vt.id])
  if (!allSelected) return null

  return (
    variants.find((variant) => {
      if (typeof variant !== 'object') return false

      // Check if this variant has all the selected options
      return variantTypes.every((vt) => {
        const selectedOptionId = selections[vt.id]
        return variant.options.some((opt) => {
          const optId = typeof opt === 'object' ? opt.id : opt
          return optId === selectedOptionId
        })
      })
    }) || null
  )
}

// Helper: Find first available option for a variant type
function findFirstAvailableOption(
  variants: Variant[],
  variantType: VariantType,
  currentSelections: Record<string, string>,
  variantTypes: VariantType[],
  currentTypeIndex: number,
): VariantOption | null {
  const options = getOptionsForVariantType(variantType, variants)

  for (const option of options) {
    if (
      isOptionAvailable(
        variants,
        variantType.id,
        option.id,
        currentSelections,
        variantTypes,
        currentTypeIndex,
      )
    ) {
      return option
    }
  }
  return null
}

// Custom hook for variant selection
export function useVariantSelector(product: Product) {
  const variants = useMemo(() => {
    return (
      product.variants?.docs?.filter((v): v is Variant => typeof v === 'object' && v !== null) ||
      []
    )
  }, [product])

  const variantTypes = useMemo(() => extractUsedVariantTypes(product, variants), [product, variants])

  const [selections, setSelections] = useState<Record<string, string>>({})
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)

  // Initialize selections with first available options
  useEffect(() => {
    if (!variantTypes.length || !variants.length) return

    const initialSelections: Record<string, string> = {}

    variantTypes.forEach((variantType, index) => {
      const firstOption = findFirstAvailableOption(
        variants,
        variantType,
        initialSelections,
        variantTypes,
        index,
      )
      if (firstOption) {
        initialSelections[variantType.id] = firstOption.id
      }
    })

    setSelections(initialSelections)
  }, [variants, variantTypes])

  // Update selected variant when selections change
  useEffect(() => {
    const matching = findMatchingVariant(variants, selections, variantTypes)
    setSelectedVariant(matching)
  }, [selections, variants, variantTypes])

  const handleOptionChange = (variantTypeId: string, optionId: string) => {
    const typeIndex = variantTypes.findIndex((vt) => vt.id === variantTypeId)
    const newSelections = { ...selections, [variantTypeId]: optionId }

    // Cascade: Update all subsequent variant types
    variantTypes.slice(typeIndex + 1).forEach((laterType, idx) => {
      const laterTypeIndex = typeIndex + 1 + idx
      const currentOptionId = newSelections[laterType.id]

      // Check if current option is still available
      const isCurrentAvailable =
        currentOptionId &&
        isOptionAvailable(
          variants,
          laterType.id,
          currentOptionId,
          newSelections,
          variantTypes,
          laterTypeIndex,
        )

      // If not available, find first available option
      if (!currentOptionId || !isCurrentAvailable) {
        const firstAvailable = findFirstAvailableOption(
          variants,
          laterType,
          newSelections,
          variantTypes,
          laterTypeIndex,
        )
        if (firstAvailable) {
          newSelections[laterType.id] = firstAvailable.id
        } else {
          delete newSelections[laterType.id]
        }
      }
    })

    setSelections(newSelections)
  }

  return {
    variantTypes,
    selections,
    selectedVariant,
    handleOptionChange,
    isOptionAvailable: (variantTypeId: string, optionId: string) => {
      const typeIndex = variantTypes.findIndex((vt) => vt.id === variantTypeId)
      return isOptionAvailable(variants, variantTypeId, optionId, selections, variantTypes, typeIndex)
    },
    getOptionsForVariantType: (variantType: VariantType) =>
      getOptionsForVariantType(variantType, variants),
  }
}
