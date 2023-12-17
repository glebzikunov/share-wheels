import { currentUser } from "@clerk/nextjs"
import { fetchUser } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"
import Map from "@/components/forms/Map"
import Searchbar from "@/components/shared/Searchbar"
import { fetchVehicles } from "@/lib/actions/vehicle.actions"

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect("/onboarding")

  const result = await fetchVehicles({
    userId: user.id,
    searchString: searchParams.q,
  })

  return (
    <section>
      <h1 className="head-text">Search</h1>
      <Searchbar routeType="search" />
      <Map data={result} />
    </section>
  )
}

export default Page
