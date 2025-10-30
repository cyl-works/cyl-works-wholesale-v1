'use client'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import React from 'react'

type VariantSelectorProps = {
  variantSelectorState: ReturnType<typeof import('./useVariantSelector').useVariantSelector>
}

export function VariantSelector({ variantSelectorState }: VariantSelectorProps) {
  const {
    variantTypes,
    selections,
    handleOptionChange,
    isOptionAvailable,
    getOptionsForVariantType,
  } = variantSelectorState

  const hasVariants = Boolean(variantTypes.length)

  if (!hasVariants) {
    return null
  }

  return variantTypes.map((variantType) => {
    const options = getOptionsForVariantType(variantType)

    if (!options.length) {
      return null
    }

    return (
      <div className="flex flex-col gap-3" key={variantType.id}>
        <p>{variantType.label}</p>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {options.map((option) => {
            const isActive = selections[variantType.id] === option.id
            const isAvailable = isOptionAvailable(variantType.id, option.id)

            return (
              <Button
                variant={'outline'}
                className={clsx('px-4 py-4 md:px-6', {
                  'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground':
                    isActive,
                })}
                key={option.id}
                onClick={() => handleOptionChange(variantType.id, option.id)}
                disabled={!isAvailable}
                title={option.label}
              >
                {option.label}
              </Button>
            )
          })}
        </div>
      </div>
    )
  })
}
