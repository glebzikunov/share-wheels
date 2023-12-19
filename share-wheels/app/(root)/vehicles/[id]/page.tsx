import Image from "next/image"
import { currentUser } from "@clerk/nextjs"
import VehicleHeader from "@/components/shared/VehicleHeader"
import { fetchUser } from "@/lib/actions/user.actions"
import { fetchVehicleDetails } from "@/lib/actions/vehicle.actions"
import Comment from "@/components/forms/Comment"
import { fetchVehicleComments } from "@/lib/actions/comment.actions"
import CommentCard from "@/components/cards/CommentCard"

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser()

  if (!user) return null

  const userInfo = await fetchUser(user.id)
  const vehicleInfo = await fetchVehicleDetails(params.id)
  const vehicleOwner = vehicleInfo.owner._id
  const vehicleComments = await fetchVehicleComments(params.id)

  return (
    <section>
      <VehicleHeader
        vehicleId={vehicleInfo._id}
        authUserId={userInfo._id}
        mark={vehicleInfo.mark}
        model={vehicleInfo.model}
        number={vehicleInfo.number}
        imgUrl={vehicleInfo.image}
        rentalAmount={vehicleInfo.rentalAmount}
        description={vehicleInfo.description}
        owner={vehicleOwner}
        isFree={vehicleInfo.isFree}
        isAvailable={vehicleInfo.isAvailable}
      />

      <div className="mt-7">
        <Comment
          vehicleId={params.id}
          currentUserImage={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {vehicleComments.map((comment: any) => (
          <CommentCard
            key={comment._id}
            content={comment.text}
            author={comment.author}
            createdAt={comment.createdAt}
          />
        ))}
      </div>
    </section>
  )
}

export default Page
