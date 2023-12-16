import ProfileHeader from "@/components/shared/ProfileHeader"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { profileTabs } from "@/constants"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Image from "next/image"

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser()

  if (!user) return null

  const userInfo = await fetchUser(params.id)

  if (!userInfo?.onboarded) redirect("/onboarding")

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
        type="User"
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
                      0
                    </p>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="rentals" className="w-full text-light-1">
              {/* TODO: fetch current user rental */}
            </TabsContent>
            <TabsContent value="rentalHistory" className="w-full text-light-1">
              <section className="mt-9 flex flex-col gap-10">
                {/* TODO: fetch user rental history */}
              </section>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </section>
  )
}

export default Page
