import Image from "next/image"
import Link from "next/link"

import { Button } from "../ui/button"
import DeleteFavourite from "../forms/DeleteFavourite"

interface Props {
  id: string
  mark: string
  model: string
  imgUrl: string
  number: string
  authUserId: string
  type: "View" | "Delete"
}

function VehicleAccountCard({
  id,
  mark,
  model,
  imgUrl,
  number,
  authUserId,
  type,
}: Props) {
  return (
    <article className="vehicleAccount-card">
      <div className="flex flex-col gap-3">
        <Link href={`/vehicles/${id}`} className="relative">
          <Image
            src={imgUrl}
            alt="Vehicle Logo"
            width={250}
            height={200}
            placeholder="blur"
            blurDataURL="/assets/image-loading.jpg"
            className="w-full rounded-xl object-cover"
          />
        </Link>

        <div>
          <h4 className="text-base-semibold text-light-1">{mark}</h4>
          <p className="text-small-medium text-gray-1">{model}</p>
          <p className="text-subtle-medium text-gray-1">{number}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
        {type === "View" ? (
          <Link href={`/vehicles/${id}`}>
            <Button
              size="sm"
              className="vehicleAccount-card_btn bg-primary-500"
            >
              View
            </Button>
          </Link>
        ) : (
          <DeleteFavourite userId={authUserId} vehicleId={id} />
        )}
      </div>
    </article>
  )
}

export default VehicleAccountCard
