'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Category } from '@/payload-types'
import { Check, X } from 'lucide-react'

type Props = {
  categories: Pick<Category, 'id' | 'title' | 'slug'>[]
  selectedFilters: string[]
  onFilterChange: (filters: string[]) => void
}

export function Filter({ categories, selectedFilters, onFilterChange }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempSelectedFilters, setTempSelectedFilters] = useState<string[]>(selectedFilters)

  const toggleCategory = (categoryId: string) => {
    setTempSelectedFilters((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleConfirm = () => {
    onFilterChange(tempSelectedFilters)
    setIsOpen(false)
  }

  const handleClearFilters = () => {
    setTempSelectedFilters([])
    onFilterChange([])
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      setTempSelectedFilters(selectedFilters)
    }
  }

  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogTrigger className="h-fit w-full cursor-pointer border p-4 text-left text-sm">
        FILTER
      </DialogTrigger>
      <DialogContent
        className="bg-foreground max-w-xs border-none p-4 sm:max-w-xs"
        showCloseButton={false}
      >
        <VisuallyHidden asChild>
          <DialogHeader>
            <DialogTitle>Categories</DialogTitle>
            <DialogDescription />
          </DialogHeader>
        </VisuallyHidden>
        <div className="flex aspect-2/3 flex-col justify-between">
          <div>
            {categories?.length ? (
              <ul className="flex h-70 w-full flex-col gap-4 overflow-auto">
                {categories.map((item) => {
                  const isSelected = tempSelectedFilters.includes(item.id)
                  return (
                    <li key={item.id}>
                      <Button
                        onClick={() => toggleCategory(item.id)}
                        className={`border-background w-full cursor-pointer justify-start border p-4 text-base ${
                          isSelected
                            ? 'bg-primary-foreground text-foreground hover:bg-primary-foreground/90'
                            : ''
                        }`}
                        variant="default"
                      >
                        {item.title.toUpperCase()}
                      </Button>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>
          <div className="flex justify-end">
            <div className="flex flex-col items-end gap-4">
              <div className="group flex cursor-pointer items-center gap-5" onClick={handleConfirm}>
                <Button
                  className="text-primary-foreground decoration-primary-foreground/0 cursor-pointer p-0 text-base"
                  variant="link"
                >
                  CONFIRM
                </Button>
                <Button
                  className="bg-foreground border-background text-primary-foreground group-hover:bg-primary-foreground group-hover:text-foreground cursor-pointer"
                  variant="outline"
                  size="icon-lg"
                >
                  <Check size={24} strokeWidth={1} className="size-6" />
                </Button>
              </div>
              <div
                className="group flex cursor-pointer items-center gap-5"
                onClick={handleClearFilters}
              >
                <Button
                  className="text-primary-foreground decoration-primary-foreground/0 cursor-pointer p-0 text-base"
                  variant="link"
                >
                  CLEAR FILTERS
                </Button>
                <Button
                  className="bg-foreground border-background text-primary-foreground group-hover:bg-primary-foreground group-hover:text-foreground cursor-pointer"
                  variant="outline"
                  size="icon-lg"
                >
                  <X size={24} strokeWidth={1} className="size-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
