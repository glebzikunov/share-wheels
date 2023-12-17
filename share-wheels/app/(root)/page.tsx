import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)

  if (!userInfo?.onboarded) redirect("/onboarding")

  if (userInfo?.onboarded) redirect("/search")

  return (
    <main>
      <h1 className="head-text">Unused Homepage</h1>
    </main>
  )
}
