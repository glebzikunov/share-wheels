import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"

import "../globals.css"

export const metadata: Metadata = {
  title: "Share Wheels",
  description: "Carsharing Web Application",
  icons: {
    icon: [
      {
        url: "/assets/share-wheels.png",
        href: "/assets/share-wheels.png",
      },
    ],
  },
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <div className="w-full flex justify-center items-center min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
