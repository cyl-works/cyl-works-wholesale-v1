import { Input } from '@/components/ui/input'

interface SearchProps {
  value: string
  onChange: (value: string) => void
}

export function Search({ value, onChange }: SearchProps) {
  return (
    <Input
      type="text"
      className="border-primary h-fit border p-4 text-right text-sm not-placeholder-shown:text-left focus:text-left focus:placeholder:opacity-0"
      dir="ltr"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="SEARCH"
    />
  )
}
