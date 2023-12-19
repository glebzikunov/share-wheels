import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { fetchUser } from "@/lib/actions/user.actions"
import { fetchVehicleDetails } from "@/lib/actions/vehicle.actions"
import EditVehicle from "@/components/forms/EditVehicle"

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  const vehicleInfo = await fetchVehicleDetails(params.id)

  if (!userInfo?.onboarded) redirect("/onboarding")
  if (userInfo._id.toString() !== vehicleInfo.owner._id.toString())
    redirect(`/vehicles/${params.id}`)

  const vehicleData = {
    vehicleId: vehicleInfo._id,
    mark: vehicleInfo.mark,
    model: vehicleInfo.model,
    number: vehicleInfo.number,
    rentalAmount: vehicleInfo.rentalAmount,
    image: vehicleInfo.image,
    isFree: vehicleInfo.isFree ? "true" : "false",
    isAvailable: vehicleInfo.isAvailable ? "true" : "false",
    description: vehicleInfo ? vehicleInfo?.description : "",
    owner: userInfo._id,
  }

  return (
    <>
      <h1 className="head-text">Edit Vehicle</h1>
      <p className="mt-3 text-base-regular text-light-2">Make any changes</p>

      <section className="mt-12">
        <EditVehicle vehicle={vehicleData} btnTitle="Edit" />
      </section>
    </>
  )
}

export default Page
