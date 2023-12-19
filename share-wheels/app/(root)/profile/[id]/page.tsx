import ProfileHeader from "@/components/shared/ProfileHeader"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { profileTabs } from "@/constants"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Image from "next/image"
import RentalsTab from "@/components/shared/RentalsTab"
import { fetchPreviousRentals } from "@/lib/actions/rental.actions"

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser()

  if (!user) return null

  const userInfo = await fetchUser(params.id)

  if (!userInfo?.onboarded) redirect("/onboarding")

  const previousRentals = await fetchPreviousRentals(params.id)

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
      {userInfo.id === user.id && (
        <div className="mt-9">
          <Tabs defaultValue="rentals" className="w-full">
            <TabsList className="tab">
              {profileTabs.map((tab) => (
                <TabsTrigger key={tab.label} value={tab.value} className="tab">
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <p className="max-sm:hidden">{tab.label}</p>
                  {tab.label === "History" && (
                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                      {previousRentals?.length}
                    </p>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="rentals" className="w-full text-light-1">
              <RentalsTab accountId={user.id} type="Active" />
            </TabsContent>
            <TabsContent
              value="rentalHistory"
              className="mt-0 w-full text-light-1"
            >
              <section className="flex flex-col gap-10">
                <RentalsTab accountId={user.id} type="History" />
              </section>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </section>
  )
}

export default Page
