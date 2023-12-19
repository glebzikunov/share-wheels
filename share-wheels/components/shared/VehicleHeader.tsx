import { formatAmount } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import RentVehicle from "../forms/RentVehicle"
import AddToFavourites from "../forms/AddToFavourites"
import PayForRent from "../forms/PayForRent"

interface Props {
  vehicleId: string
  authUserId: string
  mark: string
  model: string
  number: string
  imgUrl: string
  rentalAmount: number
  description: string
  owner: string
  isFree: boolean
  isAvailable: boolean
}
const VehicleHeader = ({
  vehicleId,
  authUserId,
  mark,
  model,
  number,
  imgUrl,
  rentalAmount,
  description,
  owner,
  isFree,
  isAvailable,
}: Props) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start">
        <div className="flex max-lg:flex-col gap-3 max-sm:w-full">
          <div className="relative object-cover">
            <Image
              src={imgUrl}
              alt="Vehicle image"
              width={300}
              height={50}
              placeholder="blur"
              blurDataURL="/assets/image-loading.jpg"
              className="rounded-xl object-cover shadow-2xl max-lg:w-full"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {mark}
            </h2>
            <p className="mt-2 text-base-medium text-gray-1">{model}</p>
            <p className="mt-2 text-base-medium text-gray-1">{number}</p>
            <p className="mt-2 text-base-medium text-gray-1">
              {formatAmount(rentalAmount)} per minute
            </p>
            <p className="mt-6 text-base-regular text-light-2">{description}</p>
          </div>
        </div>
        {owner.toString() === authUserId.toString() ? (
          <Link
            href={`/vehicles/edit/${vehicleId}`}
            className="self-start max-sm:mt-3 max-sm:self-end"
          >
            <div className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
              <Image
                src="/assets/edit.svg"
                alt="Edit Vehicle"
                width={16}
                height={16}
              />
              <p className="text-light-2">Edit</p>
            </div>
          </Link>
        ) : isFree && isAvailable ? (
          <>
            <div className="flex flex-col self-start max-sm:flex-row max-sm:self-end gap-3">
              <RentVehicle
                rentingVehicle={vehicleId}
                rentalId={authUserId.toString()}
              />
              <AddToFavourites
                userId={authUserId.toString()}
                vehicleId={vehicleId}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col self-start max-sm:flex-row max-sm:self-end gap-3">
              <PayForRent />
              <AddToFavourites
                userId={authUserId.toString()}
                vehicleId={vehicleId}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default VehicleHeader
