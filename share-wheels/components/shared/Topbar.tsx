import Link from "next/link"
import Image from "next/image"
import { SignOutButton, SignedIn } from "@clerk/nextjs"

function Topbar() {
  return (
    <nav className="topbar min-h-[70px]">
      <Link href="/search" className="flex item-center gap-4">
        <Image
          src="/assets/share-wheels.png"
          alt="logo"
          width={34}
          height={34}
        />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">
          ShareWheels
        </p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}

export default Topbar
