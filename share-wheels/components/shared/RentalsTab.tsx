import {
  fetchCurrentRentals,
  fetchPreviousRentals,
} from "@/lib/actions/rental.actions"
import RentalCard from "../cards/RentalCard"

interface Props {
  accountId: string
  type: "Active" | "History"
}

const RentalsTab = async ({ accountId, type }: Props) => {
  const activeRental = await fetchCurrentRentals(accountId)
  const previousRentals = await fetchPreviousRentals(accountId)

  return (
    <section className="mt-9 flex flex-col gap-5">
      {type === "Active" && activeRental !== null ? (
        <>
          <RentalCard rental={activeRental} />
        </>
      ) : type === "History" && previousRentals.length !== 0 ? (
        <>
          {previousRentals.map((prevRental: any) => (
            <RentalCard key={prevRental._id} rental={prevRental} />
          ))}
        </>
      ) : (
        <p className="no-result">No results.</p>
      )}
    </section>
  )
}

export default RentalsTab
