import Image from "next/image"
import { currentUser } from "@clerk/nextjs"
import { vehicleTabs } from "@/constants"
import VehicleHeader from "@/components/shared/VehicleHeader"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { fetchUser } from "@/lib/actions/user.actions"
import { fetchVehicleDetails } from "@/lib/actions/vehicle.actions"

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser()

  if (!user) return null

  const userInfo = await fetchUser(user.id)
  const vehicleInfo = await fetchVehicleDetails(params.id)
  const vehicleOwner = vehicleInfo.owner._id

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
      />

      <div className="mt-9">
        <Tabs defaultValue="comments" className="w-full">
          <TabsList className="tab">
            {vehicleTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Transactions" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {vehicleInfo?.comments?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="comments" className="w-full text-light-1">
            {/* <CommentsTab
              currentUserId={user.id}
              accountId={sharedAccountDetails._id}
              accountType="SharedAccount"
            /> */}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default Page
