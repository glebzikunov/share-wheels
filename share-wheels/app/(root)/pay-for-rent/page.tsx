import PaymentPage from "@/components/forms/PaymentPage"
import {
  fetchCurrentRentals,
  fetchRentalInfo,
} from "@/lib/actions/rental.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function Page() {
  const user = await currentUser()

  if (!user) return null

  const activeRental = await fetchCurrentRentals(user.id)
  if (activeRental === null) redirect("/search")

  const paymentInfo = await fetchRentalInfo(user.id)

  return (
    <section>
      <PaymentPage userId={user.id} paymentInfo={paymentInfo} />
    </section>
  )
}
