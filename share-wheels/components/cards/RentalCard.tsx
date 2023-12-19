import Link from "next/link"
import Image from "next/image"
import { formatDateString } from "@/lib/utils"

interface Props {
  rental: {
    startTime: string
    type: "Active" | "Finished"
    vehicle: {
      mark: string
      model: string
      image: string
      id: string
    }
  }
}

const RentalCard = ({ rental }: Props) => {
  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center ">
            <Link
              href={`/vehicles/${rental.vehicle.id}`}
              className="relative h-11 w-11"
            >
              <Image
                src={rental.vehicle.image}
                alt="Vehicle image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col">
              <Link href={`/vehicles/${rental.vehicle.id}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {rental.vehicle.mark}
                </h4>
              </Link>
              <p className="mt-2 text-small-regular text-light-2">
                {rental.vehicle.model}
              </p>
            </div>
            <div className="flex items-center justify-center">
              {rental.type === "Finished" ? (
                <>
                  <p className="text-base-semibold text-green-600">
                    {rental.type}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-base-semibold text-red-600">
                    {rental.type}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-5 text-subtle-medium text-gray-1">
        {formatDateString(rental.startTime)}
      </p>
    </article>
  )
}

export default RentalCard
