import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { fetchUser } from "@/lib/actions/user.actions"
import VehicleAccountCard from "@/components/cards/VehicleAccountCard"
import { fetchUserVehicles } from "@/lib/actions/vehicle.actions"

async function Page() {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect("/onboarding")

  const result = await fetchUserVehicles(user.id)

  return (
    <>
      <h1 className="head-text">Your Vehicles</h1>

      <section className="mt-10 flex flex-wrap gap-8">
        {result.length === 0 ? (
          <p className="no-result">You don't have any vehicles.</p>
        ) : (
          <>
            {result.map((vehicle) => (
              <VehicleAccountCard
                key={vehicle._id}
                id={vehicle._id}
                mark={vehicle.mark}
                model={vehicle.model}
                imgUrl={vehicle.image}
                number={vehicle.number}
              />
            ))}
          </>
        )}
      </section>
    </>
  )
}

export default Page
