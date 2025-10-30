import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default async function Page() {
  return (
    <>
      <div className="wrapper-7xl">
        <div className="flex justify-center">
          <h1 className="text-base font-bold md:text-2xl">WHOLESALE ORDER FORM</h1>
        </div>
        <div className="mt-8 flex flex-col gap-8 bg-[#E4E7EB] px-2 py-8 md:gap-16 md:p-16">
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold">Contact Person</label>
            <Input className="bg-primary-foreground h-12"></Input>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold">Contact Person</label>
            <Input className="bg-primary-foreground h-12"></Input>
          </div>
          <div className="grid">
            <Button variant="outline" className="bg-transparent px-4 py-4 md:px-6">
              SEND REQUEST
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
