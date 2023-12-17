import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { fetchUser } from "@/lib/actions/user.actions"
import VehicleAccountCard from "@/components/cards/VehicleAccountCard"
import { fetchFavouritesVehicles } from "@/lib/actions/vehicle.actions"

async function Page() {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect("/onboarding")

  const result = await fetchFavouritesVehicles(user.id)

  return (
    <>
      <h1 className="head-text">Favourites</h1>
      <section className="mt-10 flex flex-wrap gap-8">
        {result.length === 0 ? (
          <p className="no-result">You don't have any favourite vehicles.</p>
        ) : (
          <>
            {result.map((favouriteVehicle) => (
              <VehicleAccountCard
                key={favouriteVehicle._id}
                id={favouriteVehicle._id}
                mark={favouriteVehicle.mark}
                model={favouriteVehicle.model}
                imgUrl={favouriteVehicle.image}
                number={favouriteVehicle.number}
                authUserId={userInfo._id.toString()}
                type="Delete"
              />
            ))}
          </>
        )}
      </section>
    </>
  )
}

export default Page
